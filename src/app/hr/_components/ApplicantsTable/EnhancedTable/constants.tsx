import Link from "next/link";

import ApplicationStatusChip from "~/app/common/components/ApplicationStatusChip";

import { type Applications, type DataColumn } from "./types";

export const BASE_COLUMNS: DataColumn[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    disableSort: false,
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Enrollment No.",
    format: (value: string) => value.toUpperCase(),
    disableSort: false,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    disableSort: false,
    format: (value: Applications["data"][number]["status"]) => (
      <ApplicationStatusChip status={value} />
    ),
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Applied At",
    format: (value: string) => new Date(value).toLocaleString(),
    disableSort: false,
  },
  {
    id: "resume",
    numeric: false,
    disablePadding: false,
    label: "Resume",
    format: (value: string) => (
      <Link
        href={value}
        target="_blank"
        passHref
        className="underline"
        onClick={(e) => e.stopPropagation()}
      >
        View Resume
      </Link>
    ),
    disableSort: true,
  },
  {
    id: "passOutYear",
    numeric: false,
    disablePadding: false,
    label: "PassOut Year",
    disableSort: false,
  },
  {
    id: "program",
    numeric: false,
    disablePadding: false,
    label: "Program",
    disableSort: false,
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
    disableSort: false,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    disableSort: false,
  },
  {
    id: "cgpa",
    numeric: false,
    disablePadding: false,
    label: "CGPA",
    disableSort: false,
  },
];

export const STATUS_ORDER = [
  "REGISTERED",
  "APPROVED",
  "SHORTLISTED",
  "SELECTED",
] as const;
