import {Card, Title, Subtitle, Divider} from '@tremor/react';
import {CitySelect} from "@/shared/ui/CitySelect";

function Page() {

    return (
        <div className="bg-blue-950 min-h-screen p-4 grid place-items-center">
            <Card className="text-center bg-white max-w-[900px] w-full rounded-2xl">
                <Title className="text-2xl md:text-3xl lg:text-5xl mb-3 md:mb-5 font-bold text-cyan-900">React Weather |
                    Next.js 14.2.2</Title>
                <Subtitle className="text-[16px] md:text-[18px] lg:text-xl">
                    Power by OpenAI, next.js 14.4, Tailwind CSS, Tremor 2.4 + More
                </Subtitle>
                <Divider className="border-t-2 my-5 md:my-7"/>
                <Card className="bg-blue-950 w-full rounded-2xl mx-auto">
                    <CitySelect/>
                </Card>
            </Card>
        </div>
    );
}

export default Page;