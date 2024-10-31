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
      <FooterLinkGroup>
        <FooterLink href="https://www.linkedin.com/in/jakub-andrzejewski-6a96042a3/">
          LinkedIn
        </FooterLink>
        <FooterLink href="https://github.com/JJv222">GitHub</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
