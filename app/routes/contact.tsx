import { redirect } from "react-router";
import type { Route } from "./../+types/contact";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Contact Us - Augmented Webcraft | Get Your Project Started" },
    { 
      name: "description", 
      content: "Ready to bring your digital project to life? Contact Augmented Webcraft for expert web development consultation and custom solutions." 
    },
    { 
      name: "keywords", 
      content: "contact web development, project consultation, custom web solutions, React development quote, technical consulting" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Contact Us - Augmented Webcraft" },
    { property: "og:description", content: "Ready to bring your digital project to life? Contact us for expert web development consultation." },
    { property: "og:url", content: "https://augmentedwebcraft.com/contact" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-contact.jpg" },
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact Us - Augmented Webcraft" },
    { name: "twitter:description", content: "Ready to bring your digital project to life? Contact us for expert consultation." },
  ];
};

export const loader = async () => {
  // Redirect to home page with contact hash
  return redirect("/#contact");
};