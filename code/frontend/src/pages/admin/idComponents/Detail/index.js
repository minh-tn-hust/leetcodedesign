import HardLevel from "@/pages/admin/idComponents/Detail/components/HardLevel";
import {useState} from "react";
import {HARD_LEVEL} from "@/constants/problemStatus";
import ProblemName from "@/pages/admin/idComponents/Detail/components/ProblemName";
import dynamic from "next/dynamic";
import {set} from "react-hook-form";

const MarkdownEditor = dynamic(() => import('@/pages/admin/idComponents/Detail/components/MarkdownEditor'), {
    ssr: false,
});

export function Detail(props) {
    const [detailState, setDetailState] = useState({
        hardLevel: HARD_LEVEL.EASY,
        name: "Default Name Problem",
        description: `Ksyusha has a pet chinchilla, a tree on $n$ vertices and huge scissors. 
A tree is a connected graph without cycles. 
During a boring physics lesson Ksyusha thought about how to entertain her pet.
`,
        statement: `Chinchillas like to play with branches. A **branch** is a tree of $3$ vertices.
![](https://espresso.codeforces.com/f97b60857bf5ae7f47fcf933cdf4497c2fa852da.png)

A **cut** is the removal of some (not yet cut) edge in the tree. Ksyusha has plenty of free time, so she can afford to make enough cuts so that the tree splits into branches. In other words, after several (possibly zero) cuts, each vertex must belong to **exactly one** branch.

Help Ksyusha choose the edges to be cut or tell that it is impossible.`,
        input: `The first line contains a single integer $t (1 \\leq t \\leq 10^4)$ — number of testcases.
The first line of each testcase contains a single integer $n(2 \\leq n \\leq 2*10^5)$ — the number of vertices in the tree.

The next $n−1$ rows of each testcase contain integers $v_i$ and $u_i$ $(1 \\leq v_i,u_i \\leq n)$ — the numbers of vertices that the $i-th$ edge connects.

It is guaranteed that this set of edges forms a tree. It is also guaranteed that the sum of n over all testcases **does not exceed** $2*10^5$
.`,
        constraint: `\`\`\`c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        if(s.length()==0)return 0;   //if string of length zero comes simply return 0
        unordered_map<char,int> m;   //create map to store frequency,(get to know all unique characters
        int i=0,j=0,ans=INT_MIN; 
        while(j<s.length())   
        {
            m[s[j]]++;  //increase the frequency of the element as you traverse the string
            if(m.size()==j-i+1)  // whem map size is equal to the window size means suppose window size is 3 and map size is also three that means in map all unique characters are their
            {
                ans = max(ans,j-i+1);  //compare the length of the maximum window size
            }
            else if(m.size()<j-i+1)   //if the map size is less than the window size means there is some duplicate present like window size = 3 and map size = 2 means there is a duplicates
            {
                while(m.size()<j-i+1)  //so till the duplicates are removed completely
                {
                    m[s[i]]--;   //remove the duplicates
                    if(m[s[i]]==0)  //if the frequency becomes zero 
                    {
                        m.erase(s[i]);//delete it completely
                    }
                    i++;  //go for next element 
                }
            }
             j++;  //go for the next element
        }
        return ans;
    }
};
\`\`\``,
        output: `Print the answer for each testcase.
If the desired way to cut the tree does not exist, print $−1$.
Otherwise, print an integer $k$ — the number of edges to be cut. In the next line, print $k$ different integers $e_i$ $(1 \\leq e_i \\leq n)$ — numbers of the edges to be cut. 
If $k=0$, print an empty string instead. If there are several solutions, you can print any.`,
        tags: ""
    })

    const onChangeHardLevel = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                hardLevel: value
            }
        })
    }

    const onChangeProblemName = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                name: value
            }
        })
    }

    const onChangeDescription = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                description: value
            }
        })
    }

    const onChangeStatement = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                statement: value
            }
        })
    }

    const onChangeInput = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                input: value
            }
        })
    }

    const onChangeOutput = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                output: value
            }
        })
    }

    const onChangeConstraint = function (value) {
        setDetailState((state) => {
            return {
               ...state,
                constraint: value
            }
        })
    }

    return (
        <div>
            <HardLevel value={detailState.hardLevel} onChange={onChangeHardLevel}/>
            <div className={"mt-8"}/>
            <ProblemName value={detailState.name} onChange={onChangeProblemName}/>
            <div className={"mt-8"}/>
            <MarkdownEditor
                title={"Description"}
                value={detailState.description}
                onChange={onChangeDescription}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-48"}
                title={"Problem Statement"}
                value={detailState.statement}
                onChange={onChangeStatement}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-48"}
                title={"Input format"}
                value={detailState.input}
                onChange={onChangeInput}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-48"}
                title={"Output format"}
                value={detailState.output}
                onChange={onChangeOutput}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-48"}
                title={"Constraint"}
                value={detailState.constraint}
                onChange={onChangeConstraint}
            />
            <div className={"mb-16"}/>
        </div>
    )
}
