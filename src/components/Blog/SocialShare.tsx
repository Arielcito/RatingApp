import Link from "next/link";
import React from "react";

const SocialShare = ({ url }: { url: string }) => {
  return (
    <div className="flex flex-wrap items-center space-x-3 sm:justify-end">
      <Link
        href={`https://linkedin.com/share?url=${url}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#F8FAFB] text-sm font-semibold text-body hover:bg-primary hover:text-white dark:bg-[#15182A] dark:text-white dark:hover:bg-primary"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 2.5C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333ZM15.4167 15.4167V11C15.4167 10.2795 15.1304 9.5885 14.621 9.07903C14.1115 8.56955 13.4205 8.28333 12.7 8.28333C11.9917 8.28333 11.1667 8.71667 10.7667 9.36667V8.44167H8.44167V15.4167H10.7667V11.3083C10.7667 10.6667 11.2833 10.1417 11.925 10.1417C12.2344 10.1417 12.5312 10.2646 12.75 10.4834C12.9688 10.7022 13.0917 10.9989 13.0917 11.3083V15.4167H15.4167ZM5.73333 7.13333C6.10464 7.13333 6.46073 6.98583 6.72328 6.72328C6.98583 6.46073 7.13333 6.10464 7.13333 5.73333C7.13333 4.95833 6.50833 4.325 5.73333 4.325C5.35982 4.325 5.0016 4.47338 4.73749 4.73749C4.47338 5.0016 4.325 5.35982 4.325 5.73333C4.325 6.50833 4.95833 7.13333 5.73333 7.13333ZM6.89167 15.4167V8.44167H4.58333V15.4167H6.89167Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      <Link
        href={`https://twitter.com/intent/post?url=${url}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#F8FAFB] text-sm font-semibold text-body hover:bg-primary hover:text-white dark:bg-[#15182A] dark:text-white dark:hover:bg-primary"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7165 4.99992C18.0749 5.29159 17.3832 5.48325 16.6665 5.57492C17.3999 5.13325 17.9665 4.43325 18.2332 3.59159C17.5415 4.00825 16.7749 4.29992 15.9665 4.46659C15.3082 3.74992 14.3832 3.33325 13.3332 3.33325C11.3749 3.33325 9.77487 4.93325 9.77487 6.90825C9.77487 7.19159 9.8082 7.46659 9.86654 7.72492C6.89987 7.57492 4.2582 6.14992 2.49987 3.99159C2.19154 4.51659 2.01654 5.13325 2.01654 5.78325C2.01654 7.02492 2.64154 8.12492 3.6082 8.74992C3.01654 8.74992 2.46654 8.58325 1.9832 8.33325C1.9832 8.33325 1.9832 8.33325 1.9832 8.35825C1.9832 10.0916 3.21654 11.5416 4.84987 11.8666C4.54987 11.9499 4.2332 11.9916 3.9082 11.9916C3.6832 11.9916 3.4582 11.9666 3.24154 11.9249C3.69154 13.3333 4.99987 14.3833 6.57487 14.4083C5.3582 15.3749 3.81654 15.9416 2.1332 15.9416C1.84987 15.9416 1.56654 15.9249 1.2832 15.8916C2.86654 16.9083 4.74987 17.4999 6.76654 17.4999C13.3332 17.4999 16.9415 12.0499 16.9415 7.32492C16.9415 7.16659 16.9415 7.01658 16.9332 6.85825C17.6332 6.35825 18.2332 5.72492 18.7165 4.99992Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#F8FAFB] text-sm font-semibold text-body hover:bg-primary hover:text-white dark:bg-[#15182A] dark:text-white dark:hover:bg-primary"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99984 1.69995C5.4165 1.69995 1.6665 5.44162 1.6665 10.05C1.6665 14.2166 4.7165 17.6749 8.69984 18.2999V12.4666H6.58317V10.05H8.69984V8.20828C8.69984 6.11662 9.94151 4.96662 11.8498 4.96662C12.7582 4.96662 13.7082 5.12495 13.7082 5.12495V7.18328H12.6582C11.6248 7.18328 11.2998 7.82495 11.2998 8.48328V10.05H13.6165L13.2415 12.4666H11.2998V18.2999C13.2635 17.9898 15.0517 16.9879 16.3414 15.475C17.6312 13.9621 18.3376 12.038 18.3332 10.05C18.3332 5.44162 14.5832 1.69995 9.99984 1.69995Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </div>
  );
};

export default SocialShare;