import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Scale } from "lucide-react";
import Image from "next/image";

const DisclaimerPage = () => {
  const headingStyles =
    "text-muted-foreground w-full border-b mb-2 border-muted";
  const paragraphStyles = "text-sm ";
  return (
    <MaxWidthWrapper>
      <div className="my-6 md:my-4 px-2 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold md:text-center leading-tight tracking-tighter text-primary uppercase">
            Disclaimer
          </h1>
          <div
            aria-hidden="true"
            className="border-t w-full border-muted-foreground"
          />
          <p className={paragraphStyles}>
            Welcome to Meme Market! We&apos;re delighted to have you here.
            It&apos;s important to note that Meme Market is created purely for
            entertainment and learning purposes. The memes and content provided
            on this site are meant to bring joy, laughter, and perhaps a little
            bit of education along the way. While we strive to maintain accuracy
            and relevance in our content, please understand that the memes and
            information presented here may not always be entirely factual or
            up-to-date. We encourage you to use discernment and critical
            thinking when browsing our site.
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className={headingStyles}>Payment Information</h3>
              <p className={paragraphStyles}>
                We&apos;d like to inform our users that the Stripe account
                linked to this site is connected to a test account. This means
                that any transactions made on this site are not real purchases.
                To facilitate your experience, you can use the following demo
                card number provided by Stripe for testing purposes:{" "}
                <span className="bg-zinc-300 font-medium rounded px-2 py-1 mr-1">
                  4242 4242 4242 4242
                </span>{" "}
                Feel free to use this demo card number to &ldquo;purchase&rdquo;
                any items available on our site. Please be assured that no real
                financial transactions will occur, and your personal information
                is safe with us. We do not store any payment information
                provided during the testing process.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className={headingStyles}>Legal Notice</h3>
              <p className={paragraphStyles}>
                By using this site, you agree to abide by our Terms of Service
                and Privacy Policy. We reserve the right to modify or remove any
                content on the site at our discretion. Additionally, we are not
                liable for any damages or losses incurred while using this site,
                including but not limited to financial losses or emotional
                distress caused by the content. Thank you for visiting Meme
                Market! We hope you enjoy your time here and have a fantastic
                meme-filled experience!
              </p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="border-t w-full border-muted-foreground mt-8"
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default DisclaimerPage;
