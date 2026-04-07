export type ServiceItem = {
  title: string;
  body: string;
};

export function ServicesList({ services }: { services: ServiceItem[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <li
          key={service.title}
          className="border border-slate-200 p-6 bg-white"
        >
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {service.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
