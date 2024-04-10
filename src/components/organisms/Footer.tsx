export default function Footer() {
  return (
    <footer className="flex w-screen flex-col items-end justify-between bg-background-dark px-6 py-4 text-sm font-light text-white">
      <div className="text-right">
        <p>Contact</p>
        <p>Cookie Policy</p>
        <p>Privacy Policy</p>
      </div>
      <div className="mt-10 text-right text-xs text-gray-light">
        <p>&copy;&nbsp;2023 Kamil Woźniacki. All&nbsp;rights&nbsp;Reserved.</p>
        <p>
          <span className="text-gray">Created by </span>Hubert Rogala-Haracz
        </p>
      </div>
    </footer>
  );
}
