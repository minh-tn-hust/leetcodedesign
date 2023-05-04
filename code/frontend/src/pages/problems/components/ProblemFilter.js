import {Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function ProblemFilter(props) {
    return (
        <div className={"w-full flex flex-wrap mt-3"}>
            <FormControl className={"w-[100px]"}>
                <InputLabel id="hard-level-label">Hard Level</InputLabel>
                <Select
                    labelId="hard-level-label"
                    id="hard-level"
                    value={10}
                    label="Hard level"
                    onChange={() => {
                    }}
                >
                    <MenuItem value={10}>Easy</MenuItem>
                    <MenuItem value={20}>Medium</MenuItem>
                    <MenuItem value={30}>Hard</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={"w-[150px] ml-3"}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    id="status"
                    value={10}
                    label="Age"
                    onChange={() => {
                    }}
                >
                    <MenuItem value={10}>
                        <div className={"flex flex-row items-center"}>
                            <UnpublishedIcon/> Unsolved
                        </div>
                    </MenuItem>
                    <MenuItem value={20}>
                        <div className={"flex flex-row items-center"}>
                            <VerifiedIcon/> Solved
                        </div>
                    </MenuItem>
                </Select>
            </FormControl>
            <div class={"flex-1"}></div>
            <FormControlLabel
                className={"ml-3"}
                control={<Checkbox
                    onChange={() => {
                    }}
                    defaultChecked
                />} label="Show problem tags"/>
        </div>
    );
};