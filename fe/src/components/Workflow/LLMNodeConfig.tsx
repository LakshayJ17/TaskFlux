"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type LLMProvider = "gemini" | "openai" | "openai-paid"

interface LLMNodeConfigProps {
    onConfigChange: (config: { provider: LLMProvider; openaiKey: string }) => void
}

export default function LLMNodeConfig({ onConfigChange }: LLMNodeConfigProps) {
    const [openaiKey, setOpenaiKey] = useState("")
    const [llmProvider, setLlmProvider] = useState<LLMProvider>("gemini")

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="llm-provider">LLM Provider</Label>
                <Select
                    value={llmProvider}
                    onValueChange={value => {
                        setLlmProvider(value as LLMProvider)
                        onConfigChange({ provider: value as LLMProvider, openaiKey: "" })
                    }}
                >
                    <SelectTrigger id="llm-provider" className="w-full mt-1" >
                        <SelectValue placeholder="Select LLM Provider..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gemini">Gemini (Free)</SelectItem>
                        <SelectItem value="openai">OpenAI (Your Key)</SelectItem>
                        <SelectItem value="openai-paid" disabled>OpenAI (Buy Key From Us)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {llmProvider === "openai" && (
                <div>
                    <Label htmlFor="openai-key">Enter Your OpenAI API key</Label>
                    <Input
                        id="openai-key"
                        type="password"
                        value={openaiKey}
                        onChange={e => {
                            setOpenaiKey(e.target.value)
                            onConfigChange({ provider: "openai", openaiKey: e.target.value })
                        }}
                        placeholder="sk-..."
                        className="mt-1"
                    />

                </div>
            )}
            {llmProvider === "gemini" && (
                <div className="text-xs text-gray-500 mt-2">
                    Gemini is free for lightweight tasks. Powered by our API key.
                </div>
            )}
        </div>
    )
}