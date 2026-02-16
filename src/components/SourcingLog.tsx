import { Activity, Search, ShieldCheck } from "lucide-react";

const LOGS = [
  {
    id: "FL-991",
    name: "Jordan 4 SB Pine",
    status: "Verified",
    origin: "LHR > LOS",
    time: "2h ago",
  },
  {
    id: "FL-992",
    name: "Travis Scott Canary",
    status: "Sourcing",
    origin: "DXB > LOS",
    time: "5h ago",
  },
  {
    id: "FL-993",
    name: "Adidas Gazelle Indoor",
    status: "Verified",
    origin: "CPH > LOS",
    time: "12h ago",
  },
  {
    id: "FL-994",
    name: "Nike Dunk Low 'Otomo'",
    status: "Sourcing",
    origin: "HKG > LOS",
    time: "1d ago",
  },
];

export default function SourcingLog() {
  return (
    <section className="lab-section">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-[var(--orange)]" />
              <span className="mono text-[10px] font-bold uppercase tracking-widest opacity-50">
                Live Sourcing Feed
              </span>
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              Intake Log
            </h2>
          </div>
          <p className="mono text-[10px] opacity-40 text-right hidden md:block">
            System Status: Nominal
            <br />
            Last Scan: Lagos/Mainland
          </p>
        </div>

        <div className="lab-grid">
          {LOGS.map((log) => (
            <div key={log.id} className="lab-card group">
              <div className="scanner-line"></div>

              <div
                className={`lab-status-tag ${log.status === "Verified" ? "status-verified" : "status-sourcing"}`}
              >
                {log.status}
              </div>

              <h3 className="lab-shoe-name">{log.name}</h3>

              <div className="lab-metadata">
                <p>ID: {log.id}</p>
                <p>ROUTE: {log.origin}</p>
                <p>TIMESTAMP: {log.time}</p>
              </div>

              <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="mono text-[9px] font-bold">VIEW SPECS</span>
                {log.status === "Verified" ? (
                  <ShieldCheck size={14} className="text-green-500" />
                ) : (
                  <Search size={14} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
