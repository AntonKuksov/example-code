import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Comment } from "../../../model/Product.ts";

export default function CommentCard(comment: Comment) {
  return (
    <>
      <Card className="px-2">
        <CardHeader>
          {comment.author ? (
            comment.author.username
          ) : (
            <a href={comment.origin}>{comment.authorName}</a>
          )}
        </CardHeader>
        <CardBody>{comment.text}</CardBody>
        <CardFooter>
          {comment.rating &&
            Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index < comment.rating ? "gold" : "gray"}
                className="w-6 h-6 transition-colors"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
        </CardFooter>
      </Card>
    </>
  );
}
