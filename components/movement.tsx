import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Movement() {
  const movementItems = [
    {
      image:
        "/images/metcon.jpg",
      title: "MetCon25",
      subtitle: "",
    },
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg",
      title: "Kingdom Charge Devotional",
      subtitle: "",
    },
    {
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.16.43_flkzu9.jpg",
      title: "Grace Amplified Tour 2026",
      subtitle: "",
    },
    // {
    //   image:
    //     "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
    //   title: "NEW SINGLE",
    //   subtitle: "LISTEN NOW",
    // },
  ]

  return (
    <section className="bg-white py-10 px-3 sm:py-16 sm:px-4 md:py-20 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rubik font-bold text-[#272f31] mb-8 sm:mb-10 md:mb-14 lg:mb-16">
          Around <em className="font-playfair italic font-medium">the Encounter Movement</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {movementItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white">
                  <h3 className="font-rubik font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">{item.title}</h3>
                  <p className="font-work-sans text-xs sm:text-sm opacity-90">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 sm:space-x-8">
          <button className="p-2 sm:p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
            <ChevronLeft size={24} className="sm:hidden" />
            <ChevronLeft size={32} className="hidden sm:inline" />
          </button>
          <button className="p-2 sm:p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
            <ChevronRight size={24} className="sm:hidden" />
            <ChevronRight size={32} className="hidden sm:inline" />
          </button>
        </div>
      </div>
    </section>
  )
}
