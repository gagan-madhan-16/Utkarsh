import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel 
} from "@mui/material";

export default function GroupCard(props: JobOpeningGroupCardProps) {
  console.log("here is the group", props.group);
  return (
    <Paper elevation={4} className="group flex flex-col p-4 gap-3">
      <Typography variant="subtitle2" className="relative">
        <em>Group # {props.index + 1}</em>
        {!props.disabled && (
          <IconButton
            onClick={props.onDelete}
            className="absolute top-0 right-0 mt-[-4px]"
            color="error"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Typography>
      <FormControl size="small" required disabled={props.disabled}>
        <InputLabel>PassOut Year</InputLabel>
        <Select
          value={props.group.passOutYear || ""}
          label="PassOut Year"
          onChange={(event) => {
            props.onChange({
              ...props.group,
              passOutYear: parseInt(event.target.value.toString()),
            });
          }}
        >
          {Object.keys(props.allGroups).map((year) => (
            <MenuItem value={Number(year)} key={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        required
        disabled={props.disabled || !props.group.passOutYear}
      >
        <InputLabel>Program</InputLabel>
        <Select
          value={props.group.program || ""}
          label="Program"
          onChange={(event) => {
            props.onChange({
              ...props.group,
              program: event.target.value,
            });
          }}
        >
          {props.allGroups[props.group.passOutYear]?.map((program) => (
            <MenuItem value={program} key={program}>
              {program}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Min. CGPA"
        value={props.group.minCgpa}
        type="number"
        size="small"
        onChange={(e) =>
          props.onChange({
            ...props.group,
            minCgpa: Number(e.target.value),
          })
        }
      />
      {/* <TextField
        label="Min. Credits"
        value={props.group.minCredits}
        type="number"
        size="small"
        inputProps={{
          step: 1,
        }}
        onChange={(e) =>
          props.onChange({
            ...props.group,
            minCredits: Number(e.target.value),
          })
        }
      /> */}
      <FormControlLabel
      control={
        <Checkbox
          checked={props.group.backlog}
          onChange={(e) =>
            props.onChange({
              ...props.group,
              backlog: e.target.checked,
            })
          }
          disabled={props.disabled}
        />
      }
      label="Allow students with backlog?"
      disabled={props.disabled}
    />
    {/* <span>Backlog</span> */}

    </Paper>
  );
}
