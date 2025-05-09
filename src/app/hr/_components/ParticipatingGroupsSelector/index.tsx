"use client";

import { useState } from "react";
import { CircularProgress, Paper, Typography, Button } from "@mui/material";

import { api } from "~/trpc/react";
import GroupCard from "./GroupCard";

export default function JobOpeningGroupSelector(
  props: JobOpeningGroupsSelectorProps,
) {
  const { data: yearWisePrograms, isLoading } =
    api.placementConfig.getParticipatingGroupsForPlacementType.useQuery(
      props.jobTypeId,
    );

  const handleAddGroup = () => {
    const newGroup = {
      passOutYear: null,
      program: "",
      minCgpa: null,
      backlog: true,
      selected: true, // <-- default selected
    };
    
    props.onChange([...(props.value || []), newGroup]);
  };

  return (
    <Paper className="flex flex-col gap-4 py-2 px-3">
      <Typography>Eligible student groups:</Typography>

      {!props.jobTypeId ? (
        <Typography textAlign="center" color="text.disabled" className="py-8">
          Please select a job type first
        </Typography>
      ) : isLoading || !yearWisePrograms ? (
        <div className="flex items-center justify-center p-8">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="grid gap-2 grid-cols-1 md:auto-rows-fr sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
            {(props.value || []).map((group, index) => (
              <GroupCard
                key={props.jobTypeId + index}
                index={index}
                group={group}
                allGroups={Object.fromEntries(
                  Object.keys(yearWisePrograms)
                    .filter((key) => {
                      return (
                        (props.value || []).filter((el, elIdx) =>
                          elIdx !== index && el.passOutYear === Number(key),
                        ).length !== yearWisePrograms[Number(key)].length
                      );
                    })
                    .map((key) => [
                      key,
                      yearWisePrograms[Number(key)].filter((batch) => {
                        return !(props.value || []).some(
                          (el, elIdx) =>
                            elIdx !== index &&
                            el.program === batch &&
                            el.passOutYear === Number(key),
                        );
                      }),
                    ])
                )}
                onDelete={() => {
                  props.onChange((props.value || []).filter((_, i) => i !== index));
                }}
                onChange={(newGroup) => {
                  const newValue = [...(props.value || [])];
                  newValue[index] = newGroup;
                  props.onChange(newValue);
                }}
              />
            ))}
          </div>
          <Button
            variant="outlined"
            onClick={handleAddGroup}
            className="self-start"
          >
            + Add Group
          </Button>
        </>
      )}
    </Paper>
  );
}
