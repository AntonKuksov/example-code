import { Avatar, Button, Card } from "@heroui/react";

export default function Profile() {
  // const user = useAtomValue(userAtom);

  return (
    <>
      <Card className="w-full max-w-md p-6">
        <div className="flex justify-center">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            size="lg"
            color="primary"
            isBordered
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="font-bold">John Doe</h2>
          <h3 className="text-gray-600">johndoe@example.com</h3>
          <h4 className="mt-2 text-gray-400">
            Frontend Developer based in New York. Passionate about creating
            interactive web experiences.
          </h4>
        </div>
        <div className="flex justify-center mt-4">
          <Button>Follow</Button>
        </div>
      </Card>
    </>
  );
}
