import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

type NoteCardProps = {
    note: {
        date: Date,
        content: string
    }
}

export function NoteCard(props: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex-col text-left bg-slate-800 p-5 gap-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">
                    {formatDistanceToNow(props.note.date, {
                        locale: ptBR,
                        addSuffix: true,
                    })}
                </span>
                <p className="text-sm leading-6 text-slate-300">
                    {props.note.content}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[650px] w-full bg-slate-700 rounded-md flex flex-col outline-none h-[60vh] overflow-hidden">
                    <Dialog.Close className="absolute right-0 top-0 bg-salte-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-200">
                            {formatDistanceToNow(props.note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                        </span>
                        <p className="text-sm leading-6 text-slate-300">
                            {props.note.content}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none group"
                    >
                        Deseja{" "}
                        <span className="text-red-400 group-hover:underline">
                            apagar essa nota?
                        </span>
                    </button>
                </Dialog.DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}