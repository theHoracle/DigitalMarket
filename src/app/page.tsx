import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle, Leaf, Timer } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Quick Delivery",
    icon: Timer,
    description: "Service rendered to you in as soon as possible",
  },
  {
    name: "Gurranteed Quality",
    icon: CheckCircle,
    description:
      "Every service on our platform is verified by our team to ensure highest quality standard. Not happy? We offer a 3-day refund guranteed.",
  },
  {
    name: "For the planet",
    icon: Leaf,
    description:
      "We have pledged 1% of sales to preservation and restoration of natural resources",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-red-600">digital service.</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalOracle. Your one stop shop for all the service you
            will ever need. Every service is quality assured
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Products
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        <ProductReel
          title="Brand new"
          href="/products"
          query={{ sort: "desc", limit: 4 }}
        />
      </MaxWidthWrapper>
      <section className="border bg-gray-50 border-gray-200">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-col-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center bg-red-100 text-red-900">
                    {<perk.icon className="h-1/3 w-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm  text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
