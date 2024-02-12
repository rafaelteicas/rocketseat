import * as Dialog  from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import {toast} from 'sonner'

type Props = {
    onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: Props) {
    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [content, setContent] = useState("");
    const [isRecording, setIsRecording] = useState(true)
    let speechRecognition: SpeechRecognition | null = null
    function handleStartEditor() {
        setShouldShowOnBoarding(false);
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
        if (event.target.value === "") {
            setShouldShowOnBoarding(true);
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault();
        if (content === '') {
            return
        }
        onNoteCreated(content);
        setContent("");
        setShouldShowOnBoarding(true);
        toast.success("Nota criada com sucesso!");
    }

    function handleStartRecording() {
        setIsRecording(true);
        setShouldShowOnBoarding(false);
        const isSpeechRecognitionAPIAvailable =
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window;
        if (!isSpeechRecognitionAPIAvailable) {
            alert("Infelizmente seu navegador não suporta");
            return;
        }

        const SpeechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();

        speechRecognition.lang = "pt-BR";
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;
        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '')
            setContent(transcription);
        };
        speechRecognition.onerror = (e) => {
            console.log(e);
        };
    }

    function handleStopRecording() {
        setIsRecording(false);
        if (speechRecognition !== null) {
            speechRecognition.stop()
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-y-3 text-left">
                <span className="text-sm font-medium text-slate-200">
                    Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave uma nota ou um áudio que será convertida para texto
                    automaticamente.
                </p>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.DialogContent className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[650px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none h-[60vh] overflow-hidden">
                    <Dialog.Close className="absolute right-0 top-0 bg-salte-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>
                    <form
                        onSubmit={handleSaveNote}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-200">
                                Adicionar nota
                            </span>
                            {shouldShowOnBoarding ? (
                                <p className="text-sm leading-6 text-slate-300">
                                    Comece
                                    <button
                                        type="button"
                                        onClick={handleStartRecording}
                                        className="font-medium text-lime-500 hover:underline"
                                    >
                                        gravando uma nota
                                    </button>
                                    em áudio ou se preferir
                                    <button
                                        type="button"
                                        onClick={handleStartEditor}
                                        className="font-medium text-lime-500 hover:underline"
                                    >
                                        utilize apenas texto
                                    </button>
                                    .
                                </p>
                            ) : (
                                <textarea
                                    value={content}
                                    autoFocus
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                    onChange={handleContentChange}
                                />
                            )}
                        </div>
                        {isRecording ? (
                            <button
                                type="button"
                                onClick={handleStopRecording}
                                className="flex items-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none hover:bg-lime-500"
                            >
                                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                                Gravando (clique p/ interromper)
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSaveNote}
                                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500"
                            >
                                Salvar nota
                            </button>
                        )}
                    </form>
                </Dialog.DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}