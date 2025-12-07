function FeatureCard({ icon, title, desc }) {
    return (
        <div className="group rounded-xl border border-neutral-700 bg-neutral-900 p-6 transition-colors hover:border-white/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-200/10 text-white">
                {icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-neutral-400">{desc}</p>
        </div>
    );
}

export default FeatureCard;