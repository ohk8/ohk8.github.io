import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
        return [
            {
                id: "mock-1",
                category: "개발",
                title: "[Mock] 첫 번째 포스트",
                date: "2024-03-24",
                slug: "mock-post-1",
                excerpt: "Notion API 토큰이나 데이터베이스 ID가 설정되지 않아 보이는 임시 데이터입니다. 환경 변수를 설정해 주세요."
            },
            {
                id: "mock-2",
                category: "일반",
                title: "[Mock] 두 번째 포스트",
                date: "2024-03-23",
                slug: "mock-post-2",
                excerpt: "이 글 역시 환경 변수가 없을 때 기본적으로 노출되는 모의 데이터(Mock Data)입니다."
            },
            {
                id: "mock-3",
                category: "개발",
                title: "[Mock] 세 번째 포스트",
                date: "2024-03-22",
                slug: "mock-post-3",
                excerpt: ".env 파일에 NOTION_TOKEN과 NOTION_DATABASE_ID를 올바르게 입력 후 재시작하면 실제 데이터를 불러옵니다."
            }
        ];
    }

    try {
        const response = await notion.request({
            path: `databases/${DATABASE_ID}/query`,
            method: "POST",
            body: {
                filter: {
                    property: "Published",
                    checkbox: { equals: true },
                },
                sorts: [
                    {
                        property: "Date",
                        direction: "descending",
                    },
                ],
            },
        });

        return response.results.map((page) => ({
            id: page.id,
            category: page.properties.Category?.select?.name || page.properties.Category?.rich_text?.[0]?.plain_text || "분류 없음",
            title: page.properties.Page?.title[0]?.plain_text || "제목 없음",
            date: page.properties.Date?.date?.start || "날짜 미정",
            slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
        }));
    } catch (error) {
        console.error("Notion API Error:", error);
        return [];
    }
}