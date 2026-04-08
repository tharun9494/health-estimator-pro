import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ClientInfo {
  name: string;
  phone: string;
  business: string;
}

interface ClientFormProps {
  info: ClientInfo;
  onChange: (info: ClientInfo) => void;
}

const ClientForm = ({ info, onChange }: ClientFormProps) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-4">
    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Details</h3>
    <div className="space-y-3">
      <div>
        <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
        <Input id="name" placeholder="Client name" value={info.name} onChange={(e) => onChange({ ...info, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone</Label>
        <Input id="phone" placeholder="+91 XXXXX XXXXX" value={info.phone} onChange={(e) => onChange({ ...info, phone: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="business" className="text-xs text-muted-foreground">Business</Label>
        <Input id="business" placeholder="Hospital / Clinic name" value={info.business} onChange={(e) => onChange({ ...info, business: e.target.value })} />
      </div>
    </div>
  </div>
);

export default ClientForm;
