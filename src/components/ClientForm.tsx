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
  <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-4">
    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
      Client Details
    </h3>
    <div className="space-y-3">
      <div>
        <Label htmlFor="name" className="text-xs text-white/50">Name</Label>
        <Input 
          id="name" 
          placeholder="Client name" 
          value={info.name} 
          onChange={(e) => onChange({ ...info, name: e.target.value })} 
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#C9A227]/50"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-xs text-white/50">Phone</Label>
        <Input 
          id="phone" 
          placeholder="+91 XXXXX XXXXX" 
          value={info.phone} 
          onChange={(e) => onChange({ ...info, phone: e.target.value })} 
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#C9A227]/50"
        />
      </div>
      <div>
        <Label htmlFor="business" className="text-xs text-white/50">Business</Label>
        <Input 
          id="business" 
          placeholder="Business name" 
          value={info.business} 
          onChange={(e) => onChange({ ...info, business: e.target.value })} 
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#C9A227]/50"
        />
      </div>
    </div>
  </div>
);

export default ClientForm;
