//
import { Card, Badge } from "antd";
import Link from "next/link";
import { CurrencyFormatter } from "../helper/CurrencyConvert";
//

//

const courseCard = ({ course }) => {
  // let nAIRA_Sign = "\u20A6";  // console
  const { name, slug, description, price, image, instructor, category, paid } =
    course;
  return (
    <>
      <Link href={`/course/${slug}`}>
        <a style={{ textDecoration: "none" }}>
          <Card
            cover={
              <img
                src={image.Location}
                height="230px"
                className="objectFit"
                style={{ objectFit: "cover" }}
              />
            }
          >
            <h4>
              <b>{name}</b>
            </h4>
            <p>By: {instructor.name}</p>
            <Badge
              style={{ backgroundColor: "rgb(55, 55, 156)" }}
              count={category}
            ></Badge>

            <h6 className="mt-2">
              <b>
                {paid
                  ? CurrencyFormatter({
                      amount: price,
                      currency: "USD",
                    })
                  : "Free"}
              </b>
            </h6>
          </Card>
        </a>
      </Link>
    </>
  );
};

export default courseCard;
