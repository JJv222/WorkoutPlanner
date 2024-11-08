import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function Component() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2024} />
      <Footer.Brand
        href="https://github.com/JJv222"
        src="images/github-mark.svg"
        alt="GitHub Logo"
        name="Profile"
      />
      <Footer.Brand
        href="https://www.linkedin.com/in/jakub-andrzejewski-6a96042a3/"
        src="images/LI-Logo.png"
        alt="LinkedIn Logo"
        name="Profile"
      />
      <FooterLinkGroup>
        <FooterLink href=""></FooterLink>
        <FooterLink href=""></FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
