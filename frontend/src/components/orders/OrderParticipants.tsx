import { CheckCircle2, Copy, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ParticipantRole = "Client" | "Freelancer";

type Participant = {
  role: ParticipantRole;
  address?: string;
  isCurrentUser: boolean;
};

type OrderParticipantsProps = {
  client: string;
  freelancer?: string;
  currentAddress?: string;
};

export function OrderParticipants({
  client,
  freelancer,
  currentAddress,
}: OrderParticipantsProps) {
  const normalizedAddress = currentAddress?.toLowerCase();

  const participants: Participant[] = [
    {
      role: "Client",
      address: client,
      isCurrentUser: normalizedAddress === client.toLowerCase(),
    },
    {
      role: "Freelancer",
      address: freelancer,
      isCurrentUser: !!freelancer && normalizedAddress === freelancer.toLowerCase(),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        {participants.map((participant) => (
          <ParticipantCard key={participant.role} participant={participant} />
        ))}
      </CardContent>
    </Card>
  );
}

type ParticipantCardProps = {
  participant: Participant;
};

function ParticipantCard({ participant }: ParticipantCardProps) {
  const { address, isCurrentUser, role } = participant;

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-950/30 p-5",
        isCurrentUser && "border-cyan-400/30 bg-cyan-400/5",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            <UserRound className="size-5" />
          </div>

          <div>
            <p className="font-medium text-slate-100">{role}</p>
            <p className="mt-1 text-xs text-slate-500">
              {role === "Client" ? "Created the escrow" : "Accepted the work"}
            </p>
          </div>
        </div>

        {isCurrentUser ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-200">
            <CheckCircle2 className="size-3" />
            You
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2">
        <span className="min-w-0 truncate font-mono text-sm text-slate-300">
          {address ? formatAddress(address) : "Not assigned"}
        </span>

        {address ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={() => void navigator.clipboard.writeText(address)}
          >
            <Copy className="size-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
