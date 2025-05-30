import { Button, Container, Flex, Text, Textarea, Title } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { generateSummary } from "../utils/service-call"
import { useState } from "react"

const SummaryPage = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const {
        data: summary,
        mutate: summarize,
        isPending: summarizing,
    } = useMutation<string, unknown, string>({
        mutationFn: generateSummary,
    })

    const handleSummarize = (value: string) => {
        if (value) {
            summarize(value)
        }
    }

    return (
        <Container className="container" size="lg">
            <Flex align="center" justify="space-between">
                <Title mt={30} mb={30}>
                    AI-Powered Text Generation Summary
                </Title>

                <Button
                    variant="light"
                    color="#1D72FE"
                    onClick={() => navigate("/")}
                >
                    Go to Home Page
                </Button>
            </Flex>
            <Textarea
                label="Paste your text here to summarize"
                placeholder="Enter text to summarize..."
                rows={10}
                cols={80}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Button
                mt={20}
                color="#1D72FE"
                onClick={() => handleSummarize(value)}
                disabled={!value || summarizing}
            >
                {summarizing ? "Generating Summary..." : "Generate Summary"}
            </Button>

            {summary && (
                <Text mt={20} style={{ whiteSpace: "pre-wrap" }}>
                    {summary}
                </Text>
            )}
        </Container>
    )
}

export default SummaryPage
