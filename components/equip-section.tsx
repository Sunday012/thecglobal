import { ChevronLeft, ChevronRight } from "lucide-react"

export default function EquipSection() {
  return (
    <section className="bg-gradient-to-r from-[#272f31] to-[#0A523B] py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-white/70 font-work-sans text-lg mb-4">Knowing God Above All Else</p>
          <h2 className="text-6xl font-rubik font-bold text-white mb-8">Encounter Equip</h2>
          <p className="text-white/90 font-work-sans text-lg leading-relaxed max-w-3xl mx-auto">
            Encounter Equip exists to see people in our House and around the globe know and draw closer to Jesus. This
            is an incredible tool for everyone in our House to engage with God's Word and grow in their faith journey.
          </p>
        </div>

        <div className="flex justify-center space-x-8">
          <button className="p-3 text-white/70 hover:text-white transition-colors">
            <ChevronLeft size={32} />
          </button>
          <button className="p-3 text-white/70 hover:text-white transition-colors">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}
