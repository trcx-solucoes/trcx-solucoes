export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Fundamentos",
    items: [
      { name: "Tokens de Design", href: "/styleguide" },
    ],
  },
  {
    title: "Componentes",
    items: [
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Checkbox", href: "/styleguide/components/checkbox" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Label", href: "/styleguide/components/label" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Select", href: "/styleguide/components/select" },
      { name: "Separator", href: "/styleguide/components/separator" },
      { name: "Skeleton", href: "/styleguide/components/skeleton" },
      { name: "Switch", href: "/styleguide/components/switch" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
      { name: "Textarea", href: "/styleguide/components/textarea" },
    ],
  },
  {
    title: "Exemplos",
    items: [
      { name: "Login", href: "/styleguide/examples/login" },
    ],
  },
];
