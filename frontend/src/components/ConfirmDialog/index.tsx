import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useEventDetails } from "@/contexts/eventDetailsContext";
import { CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react'; // precisa instalar o qrcode.react
import { Button } from "../Button";
// npm install qrcode.react

interface ConfirmPresenceModalProps {
  guestName: string[];
  onClose?: () => void;
  onOpen: boolean;
}

export function ConfirmPresenceModal({ guestName, onOpen, onClose }: ConfirmPresenceModalProps) {
  const { eventDetails, calendarUrl } = useEventDetails();




  const qrCodeData = `
🎉 60 anos de casado Maria José e Tunico
📍 Endereço: ${eventDetails.location}
📅 Data: 31/05/2025
🕛 Horário: 12h00
👔 Traje: Sport fino
🎁 Presente: 1kg de alimento não perecível
`;

  return (
    <Dialog open={onOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 rounded-2xl shadow-lg bg-white">
        <DialogHeader className="flex flex-col items-center gap-2">
          <CheckCircle2 className="text-green-500 w-12 h-12" />
          <DialogTitle className="text-center text-xl font-semibold text-zinc-800">
            Confirmação recebida!
          </DialogTitle>
        </DialogHeader>

        <div className="text-center mt-4 space-y-2">
          <p className="text-zinc-700 text-base font-medium">
            Presença confirmada com sucesso! 🎉
          </p>
          <p className="text-zinc-600 text-sm">
            Agradecemos por confirmar. Veja os detalhes do evento:
          </p>

          <div className="text-zinc-700 text-sm text-left mt-6 space-y-1">
            <p><strong>📅 Data:</strong> 31 de Maio de 2025</p>
            <p><strong>🕛 Horário:</strong> 12:00 horas</p>
            <p>
              <strong>📍 Endereço: </strong>
              <a
                href={`https://maps.google.com/?q=${eventDetails.location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {eventDetails.location}
              </a>
            </p>
            <p><strong>👔 Traje:</strong> Sport fino</p>
            <p><strong>🎁 Presente:</strong> 1kg de alimento não perecível</p>
          </div>


          <div className="flex justify-center mt-4">
            <a
              href={calendarUrl}
              download="evento.ics"
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 text-sm"
            >
              Adicionar à Agenda 📅
            </a>
          </div>

          <div className="flex justify-center mt-6">
            <QRCodeSVG value={qrCodeData} size={140} />
          </div>

          <div className="mt-6">
            <table className="w-full text-sm text-left border border-zinc-200 rounded-md overflow-hidden">
              <thead className="bg-zinc-100 text-zinc-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Nome</th>
                </tr>
              </thead>
              <tbody>
                {guestName?.map((guest, index) => (
                  <tr key={index} className="border-t text-zinc-700">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{guest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter className="w-full mt-4">
          <DialogClose asChild>
            <Button className="w-full">Entendi!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
