import { ChevronLeft, ChevronRight } from "lucide-react"

export default function EquipSection() {
  return (
    <section className="bg-gradient-to-r from-[#272f31] to-[#0A523B] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-white/70 font-work-sans text-base sm:text-lg mb-2 sm:mb-4">Knowing God Above All Else</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-4 sm:mb-6 md:mb-8">Encounter Equip</h2>
          <p className="text-white/90 font-work-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
            Encounter Equip exists to see people in our House and around the globe know and draw closer to Jesus. This
            is an incredible tool for everyone in our House to engage with God's Word and grow in their faith journey.
          </p>
        </div>

        <div className="flex flex-row justify-center items-center  xs:space-y-0 xs:space-x-8">
          <button className="p-2 sm:p-3 text-white/70 hover:text-white transition-colors">
            <ChevronLeft size={28} className="sm:size-8" />
          </button>
          <button className="p-2 sm:p-3 text-white/70 hover:text-white transition-colors">
            <ChevronRight size={28} className="sm:size-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
