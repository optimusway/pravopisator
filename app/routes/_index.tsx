import { CheckIcon, CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Blockquote,
  Box,
  Button,
  Callout,
  Container,
  Flex,
  Heading,
  Link,
  Separator,
  Skeleton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Правописатор – Помогатор по правописанию" },
    {
      name: "description",
      content:
        "Правописатор исправляет ошибки и опечатки, расставляет запятые и знаки препинания.",
    },
  ];
};

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = String(formData.get("text"));

  if (!text) {
    return json({
      error: "Введите текст",
      result: "",
    });
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/ai-forever/sage-fredt5-distilled-95m",
    {
      headers: {
        Authorization: `Bearer ${context.cloudflare.env.HF_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    },
  );

  const result = await response.json();
  const error = result?.error ? String(result?.error) : "";

  return json({
    error: error.includes("loading")
      ? "Модель загружается. Попробуйте через несколько секунд"
      : error,
    result: Array.isArray(result) ? String(result[0]?.generated_text) : "",
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const isReady = actionData;

  const [copied, setCopied] = useState("Скопировать");

  return (
    <Container size="1" height={"100dvh"}>
      <Flex direction={"column"} height={"100%"} px="2" pt={"4"} pb={"2"}>
        <Heading>Правописатор</Heading>
        <Text>
          Исправляет ошибки и опечатки, расставляет запятые и знаки препинания.
        </Text>
        <Box mt="2">
          <Form method="POST">
            <TextArea
              name="text"
              rows={4}
              placeholder="Введите фразу или предложение..."
            />
            <Flex justify={"end"}>
              <Button type="submit" loading={isSubmitting} mt={"2"}>
                <CheckIcon />
                <Text>Исправить</Text>
              </Button>
            </Flex>
          </Form>
        </Box>

        {isReady ? (
          <Box mt={"4"}>
            {actionData.error ? (
              <Callout.Root color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{actionData?.error}</Callout.Text>
              </Callout.Root>
            ) : null}

            {actionData.result ? (
              <Box>
                <Skeleton loading={isSubmitting}>
                  <Heading size={"4"}>Без ошибок и с запятыми 👇</Heading>
                </Skeleton>
                <Skeleton loading={isSubmitting}>
                  <Flex direction={"column"} gap={"2"} mt="2">
                    <Blockquote size={"3"}>{actionData?.result}</Blockquote>
                    <Flex align={"center"} justify={"end"} gap={"2"}>
                      <Button
                        variant="soft"
                        size={"2"}
                        onClick={async () => {
                          if (navigator.clipboard) {
                            await navigator.clipboard.writeText(
                              actionData.result,
                            );
                            setCopied("Скопировано");
                            setTimeout(() => {
                              setCopied("Скопировать");
                            }, 3000);
                          }
                        }}
                      >
                        <CopyIcon />
                        {copied}
                      </Button>
                    </Flex>
                  </Flex>
                </Skeleton>
              </Box>
            ) : null}
          </Box>
        ) : null}

        <Flex asChild mt={"auto"} justify={"center"} align={"center"}>
          <footer>
            <Text size={"2"}>
              <Link href="https://x.com/optimusway" size={"2"}>
                @optimusway
              </Link>
            </Text>
            <Separator orientation={"vertical"} mx={"2"} />
            <Text size={"2"}>
              Работает на{" "}
              <Link href="https://github.com/ai-forever/sage">SAGE</Link>
            </Text>
          </footer>
        </Flex>
      </Flex>
    </Container>
  );
}
