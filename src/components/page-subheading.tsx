interface Props {
  children: string;
}

export default function PageSubheading({ children }: Props) {
  return <h1 className="text-md mt-4">{children}</h1>;
}
