"use client";

import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Container, Paper, Typography } from "@mui/material";

import FullPageLoader from "~/app/common/components/FullPageLoader";
import { api } from "~/trpc/react";

import ApplicationsSection from "./_components/Applications";
import DataDisplay from "./_components/DataDisplay";
import ResumeSection from "./_components/resume";
import NOCSection from "./_components/noc";
import SelectionsDataDisplay from "./_components/Selections";

export default function TrackStudentPage() {
  const { username } = useParams();
  const decodedUsername = decodeURIComponent(decodeURIComponent(username as string));

  const { data, isLoading, isError } =
    api.student.getStudentDetails.useQuery(decodedUsername);

  const [isDebarred, setIsDebarred] = useState<boolean | null>(null);

  api.student.getDebarStatus.useQuery(decodedUsername, {
    enabled: !!decodedUsername,
    onSuccess: (flag) => setIsDebarred(flag),
    onError: () => setIsDebarred(null),
  });

  const toggleDebarMutation = api.student.toggleDebarStatus.useMutation({
    onSuccess: (newFlag) => {
      setIsDebarred(newFlag);
    },
    onError: () => {
      /* show error toast/snackbar */
    },
  });

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!data || isError) {
    return (
      <Container className="flex flex-col h-full items-center justify-center gap-4">
        <PersonOffIcon sx={{ fontSize: 100 }} />
        <Typography variant="h6">
          No student found with username: {(username as string).toUpperCase()}
        </Typography>
      </Container>
    );
  }
console.log(data);
  return (
    <Container className="py-2 max-w-[inherit] flex flex-col gap-6">
      <Paper className="p-3 flex flex-col gap-2" elevation={4}>
        <div className="flex flex-row gap-2 items-end">
          <Typography variant="h5">{data.user.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {data.user.username.toUpperCase()}
          </Typography>
        </div>
        <div className="flex flex-row gap-x-4 gap-y-2 flex-wrap mt-2">
          <DataDisplay label="Program" value={data.program} />
          <DataDisplay label="Admission Year" value={data.passOutYear} />
          <DataDisplay label="Email" value={data.email} />
          <DataDisplay label="Phone" value={data.phone} />
          <DataDisplay label="CGPA" value={data.cgpa} />
          <DataDisplay label="Gender" value={data.gender} />
          <DataDisplay
            label="Date of Birth"
            value={dayjs(data.dob).format("DD MMM, YYYY")}
          />
          <DataDisplay
            label="Address"
            value={[data.addressLine1, data.addressLine2].join(", ")}
          />
          <DataDisplay label="City" value={`${data.city} (${data.pincode})`} />
          <DataDisplay label="State" value={`${data.state}, ${data.country}`} />
          <DataDisplay label="Tenth Marks" value={data.tenthMarks} />
          <DataDisplay label="Twelveth Marks" value={data.twelvethMarks} />
        </div>
      </Paper>
      {isDebarred !== null && (
        <Button
          variant="contained"
          color={isDebarred ? "success" : "error"}
          onClick={() =>
            toggleDebarMutation.mutate(decodedUsername)
          }
          className="self-start"
        >
          {isDebarred ? "Undebar" : "Debar"}
        </Button>
      )}
      <ResumeSection resumes={data.resume} />
      <SelectionsDataDisplay data={data.selections} />
      <ApplicationsSection data={data.applications} />
      {/* <NOCSection nocs={data.noc} /> */}
    </Container>
  );
}
