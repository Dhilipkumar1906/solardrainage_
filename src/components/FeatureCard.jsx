export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 text-white shadow-lg">
      <div className="text-emerald-400 mb-4">{icon}</div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
    </div>
  );
}
