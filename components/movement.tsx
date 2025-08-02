import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Movement() {
  const movementItems = [
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.59_yr6rbv.jpg",
      title: "Encounter 2026",
      subtitle: "January 13, 2026",
    },
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg",
      title: "EncounterEquip",
      subtitle: "KNOWING GOD ABOVE ALL ELSE",
    },
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.16.43_flkzu9.jpg",
      title: "Encounter Camp",
      subtitle: "JULY 14-16, 2025",
    },
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
      title: "NEW SINGLE",
      subtitle: "LISTEN NOW",
    },
  ]

  return (
    <section className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-rubik font-bold text-[#272f31] mb-16">
          Around <em className="font-playfair italic font-medium">the Encounter Movement</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {movementItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-rubik font-bold text-xl mb-1">{item.title}</h3>
                  <p className="font-work-sans text-sm opacity-90">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-8">
          <button className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
            <ChevronLeft size={32} />
          </button>
          <button className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}
