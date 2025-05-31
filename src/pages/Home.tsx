import { useState } from "react"
import {
    Button,
    Center,
    Container,
    Flex,
    Loader,
    Select,
    Text,
    Title,
} from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchSuggestions, generateText } from "../utils/service-call"
import { useNavigate } from "react-router-dom"
import { HiOutlineClipboardDocument } from "react-icons/hi2"
import { useDebouncedValue } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"

const Home = () => {
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState("")
    const [selectedText, setSelectedText] = useState("")
    const [debouncedValue] = useDebouncedValue(inputValue, 500) // 500ms debounce

    const { data: suggestion, isFetching } = useQuery({
        queryKey: ["autocomplete", debouncedValue],
        queryFn: () => fetchSuggestions(debouncedValue),
        enabled: !!debouncedValue,
    })

    const { data: suggestions } = useQuery<string[]>({
        queryKey: ["autocomplete", debouncedValue],
        queryFn: () => fetchSuggestions(debouncedValue),
        enabled: !!debouncedValue,
    })

    const {
        data: generatedText,
        mutate: generate,
        isPending: generating,
    } = useMutation<string, unknown, string>({
        mutationFn: generateText,
    })

    const handleSelect = (value: string | null) => {
        const selected = value || ""
        setSelectedText(selected)
        if (selected) {
            generate(selected)
        }
    }

    const handleCopyToClipboard = () => {
        if (generatedText) {
            navigator.clipboard.writeText(generatedText)
            notifications.show({
                message: "Generated text copied to clipboard!",
                position: "top-right",
                color: "green",
            })
        }
    }

    return (
        <Container className="container" size="lg">
            <Flex align="center" justify="space-between" mt={30} mb={30}>
                <Title>AI-Powered Autocomplete and Text Generation</Title>
                <Button
                    variant="light"
                    color="#1D72FE"
                    onClick={() => navigate("/summary")}
                >
                    Go to Summary Page
                </Button>
            </Flex>

            <Text mt={4} mb={4}>
                This application uses Gemini AI to provide autocomplete
                suggestions and generate text based on user input.
            </Text>

            {isFetching && <p className=" mt-2">Loading suggestion...</p>}
            {suggestion && !isFetching && (
                <>
                    <Text mt={20} mb={20}>
                        <strong>Suggestions:</strong>{" "}
                        {suggestion
                            ?.map((suggested_text) => suggested_text.trim())
                            .join(", ") || "No suggestions found."}
                    </Text>
                </>
            )}

            <Select
                mt={20}
                mb={20}
                value={selectedText} // Bind the selected value
                searchable
                onSearchChange={(value) => setInputValue(value)} // Update inputValue when searching
                onChange={handleSelect} // Update selectedText when an option is selected
                className="w-full p-2 border rounded"
                label="Autocomplete Suggestions"
                placeholder="Select a suggestion"
                data={suggestions?.map((suggestion) => ({
                    value: suggestion,
                    label: suggestion,
                }))}
                rightSection={isFetching ? <Loader size="xs" /> : null} // Show loader while fetching
            />

            {generating && (
                <Center>
                    <Loader size="lg" color="orange" />
                </Center>
            )}

            {generatedText && !generating && (
                <>
                    <Flex justify="space-between" align="center" mb={20}>
                        <Title order={2}>Generated Text:</Title>
                        <Button
                            mt={10}
                            color="#1D72FE"
                            onClick={handleCopyToClipboard}
                            variant="light"
                        >
                            <HiOutlineClipboardDocument size={20} />
                            Copy Summary to Clipboard
                        </Button>
                    </Flex>
                    <Text mb={4}>{generatedText}</Text>
                </>
            )}
        </Container>
    )
}

export default Home
