// app/api/contact/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactData = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // First, check if the sheet has headers, if not add them
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A1:G1',
    });

    // If no headers exist, add them
    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: 'Sheet1!A1:G1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [['First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Message', 'Date Submitted']]
        }
      });
    }

    // Prepare the row data
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const rowData = [
      firstName,
      lastName,
      email,
      phone || '', // Empty string if not provided
      subject,
      message,
      currentDate
    ];

    // Append the new row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
        dateSubmitted: currentDate
      }
    });
    
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: GET method to retrieve contact messages
export async function GET(request: NextRequest) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:G', // Get all contact data
    });
    
    const rows = response.data.values || [];
    
    // Skip header row and format data
    const contactData = rows.slice(1).map(row => ({
      firstName: row[0] || '',
      lastName: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      subject: row[4] || '',
      message: row[5] || '',
      dateSubmitted: row[6] || ''
    }));
    
    return NextResponse.json({
      success: true,
      data: contactData,
      count: contactData.length
    });
    
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contact data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}