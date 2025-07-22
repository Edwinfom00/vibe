import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";


export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event }) => {

        const codeAgent = createAgent({
            name: "code-agent",
            system: "You are an expert nextjs developer. You write readeble, maintainable code. You write simple Next.js & React snippets",
            model: gemini({ model: "gemini-2.5-flash" }),
        });

        const { output } = await codeAgent.run(`Write the followings snippets: ${event.data.value}`);

        console.log(output);
        return { output };
    },
);