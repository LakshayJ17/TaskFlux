import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function FAQsection() {
    return (
        <section className="relative py-20 px-4 sm:px-8 md:px-16 w-full bg-white dark:bg-black overflow-hidden">
            <h2 className="text-3xl font-bold mb-10 text-center text-black dark:text-white">
                Frequently Asked Questions – TaskFlux
            </h2>

            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is TaskFlux?</AccordionTrigger>
                    <AccordionContent>
                        TaskFlux is a visual workflow builder where you can drag and connect
                        predefined nodes (blocks) on a canvas to build automations. Think of
                        it like laying out logic flows using boxes and wires – no code
                        needed.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Is coding required?</AccordionTrigger>
                    <AccordionContent>
                        No, but if you want, you can write custom logic inside a Function
                        Node using JavaScript to do advanced stuff.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Is TaskFlux free?</AccordionTrigger>
                    <AccordionContent>
                        Yes! TaskFlux is free to use for up to 5 workflows per user. You can
                        create, edit, and execute these workflows without any charge.
                        <br />
                        <br />
                        For power users or teams, we offer a <strong>Plus Plan</strong> with:
                        <ul className="list-disc list-inside mt-2">
                            <li>More workflows</li>
                            <li>Team collaboration</li>
                            <li>AI agent support (requires your own OpenAI key)</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
