import {Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import VerifiedIcon from '@mui/icons-material/Verified';
import {useState} from "react";
import {HARD_LEVEL, PROBLEM_STATUS} from "@/constants/problemStatus";

export default function ProblemFilter(props) {
    const [filterConfig, setFilterConfig] = useState({
        hardLevel: HARD_LEVEL.ALL,
        status: PROBLEM_STATUS.ALL,
        isShowTag : false
    })

    const onChangeShowProblemTag = function() {
        setFilterConfig(state => {
            return {
                ...state,
                isShowTag: !state.isShowTag
            }
        })
    }

    const onChangeHardLevel = function(newHardLevel) {
        setFilterConfig(state => {
            return {
                ...state,
                hardLevel: newHardLevel
            }
        })
    }

    const onChangeStatus = function(newStatus) {
        setFilterConfig(state => {
            return {
                ...state,
                status: newStatus
            }
        })
    }

    return (
        <div className={"w-full flex flex-wrap mt-3"}>
            <FormControl className={"w-[150px]"}>
                <InputLabel id="hard-level-label">Hard Level</InputLabel>
                <Select
                    size={"small"}
                    labelId="hard-level-label"
                    id="hard-level"
                    value={filterConfig.hardLevel}
                    label="Hard level"
                    onChange={(event) => {onChangeHardLevel(event.target.value)}}
                >
                    <MenuItem value={HARD_LEVEL.EASY}>Easy</MenuItem>
                    <MenuItem value={HARD_LEVEL.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={HARD_LEVEL.HARD}>Hard</MenuItem>
                    <MenuItem value={HARD_LEVEL.ALL}>All</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={"w-[150px] ml-3"}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    size={"small"}
                    labelId="status-label"
                    id="status"
                    value={filterConfig.status}
                    label="Status"
                    onChange={(event) => {onChangeStatus(event.target.value)}}
                >
                    <MenuItem value={PROBLEM_STATUS.UNSOLVED}> Unsolved </MenuItem>
                    <MenuItem value={PROBLEM_STATUS.SOLVED}> Solved </MenuItem>
                    <MenuItem value={PROBLEM_STATUS.ALL}> All </MenuItem>
                </Select>
            </FormControl>
            <div className={"flex-1"}></div>
            <FormControlLabel
                className={"ml-3"}
                control={<Checkbox
                    value={filterConfig.isShowTag}
                    onChange={() => {
                    }}
                />} label="Show problem tags"/>
        </div>
    );
};