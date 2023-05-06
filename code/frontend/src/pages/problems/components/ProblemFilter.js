import {Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import VerifiedIcon from '@mui/icons-material/Verified';
import {useState} from "react";
import {HardLevelEnum, ProblemStatusEnum} from "@/constants/problemStatus";

export default function ProblemFilter(props) {
    const [filterConfig, setFilterConfig] = useState({
        hardLevel: HardLevelEnum.ALL,
        status: ProblemStatusEnum.ALL,
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
                    <MenuItem value={HardLevelEnum.EASY}>Easy</MenuItem>
                    <MenuItem value={HardLevelEnum.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={HardLevelEnum.HARD}>Hard</MenuItem>
                    <MenuItem value={HardLevelEnum.ALL}>All</MenuItem>
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
                    <MenuItem value={ProblemStatusEnum.UNSOLVED}> Unsolved </MenuItem>
                    <MenuItem value={ProblemStatusEnum.SOLVED}> Solved </MenuItem>
                    <MenuItem value={ProblemStatusEnum.ALL}> All </MenuItem>
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