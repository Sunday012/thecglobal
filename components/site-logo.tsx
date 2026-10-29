import Image from "next/image"
import Link from "next/link"

export default function SiteLogo() {
  return (
    <Link href="/" className="brand" aria-label="The Encounter Center Global — home">
      <Image
        src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
        alt="The Encounter Center Global"
        width={158}
        height={57}
        className="brand-logo"
      />
    </Link>
  )
}
