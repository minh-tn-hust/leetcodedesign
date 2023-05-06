import ProblemSlot from "@/models/ProblemSlot";
import Category from "@/models/Category";
import {HardLevelEnum, ProblemStatusEnum} from "@/constants/problemStatus";

export const getListProblemMockup = function(numberOfSlot) {
    let listTitle = [
        "COMPETITIVE PROGRAMMING PROBLEM Is Essential For Your Success. Read This To Find Out Why",
        "Using 7 COMPETITIVE PROGRAMMING PROBLEM Strategies Like The Pros",
        "Clear And Unbiased Facts About COMPETITIVE PROGRAMMING PROBLEM (Without All the Hype)",
        "How To Win Clients And Influence Markets with COMPETITIVE PROGRAMMING PROBLEM",
        "How We Improved Our COMPETITIVE PROGRAMMING PROBLEM In One Week(Month, Day)",
        "5 Easy Ways You Can Turn COMPETITIVE PROGRAMMING PROBLEM Into Success",
        "3 Simple Tips For Using COMPETITIVE PROGRAMMING PROBLEM To Get Ahead Your Competition",
        "COMPETITIVE PROGRAMMING PROBLEM Is Bound To Make An Impact In Your Business",
        "Here Is A Method That Is Helping COMPETITIVE PROGRAMMING PROBLEM",
        "Secrets To COMPETITIVE PROGRAMMING PROBLEM – Even In This Down Economy",
        "9 Ridiculous Rules About COMPETITIVE PROGRAMMING PROBLEM",
        "3 Ways To Master COMPETITIVE PROGRAMMING PROBLEM Without Breaking A Sweat",
        "Are You Embarrassed By Your COMPETITIVE PROGRAMMING PROBLEM Skills? Here's What To Do",
        "At Last, The Secret To COMPETITIVE PROGRAMMING PROBLEM Is Revealed",
        "COMPETITIVE PROGRAMMING PROBLEM Strategies For Beginners",
        "Why I Hate COMPETITIVE PROGRAMMING PROBLEM",
        "Answered: Your Most Burning Questions About COMPETITIVE PROGRAMMING PROBLEM",
        "5 Romantic COMPETITIVE PROGRAMMING PROBLEM Ideas",
        "COMPETITIVE PROGRAMMING PROBLEM Works Only Under These Conditions",
        "How To Quit COMPETITIVE PROGRAMMING PROBLEM In 5 Days",
        "You Don't Have To Be A Big Corporation To Start COMPETITIVE PROGRAMMING PROBLEM",
        "Want To Step Up Your COMPETITIVE PROGRAMMING PROBLEM? You Need To Read This First",
        "Never Changing COMPETITIVE PROGRAMMING PROBLEM Will Eventually Destroy You",
        "Congratulations! Your COMPETITIVE PROGRAMMING PROBLEM Is (Are) About To Stop Being Relevant",
        "3 Ways To Have (A) More Appealing COMPETITIVE PROGRAMMING PROBLEM",
        "Who Else Wants To Know The Mystery Behind COMPETITIVE PROGRAMMING PROBLEM?",
        "The Ultimate Secret Of COMPETITIVE PROGRAMMING PROBLEM",
        "3 Mistakes In COMPETITIVE PROGRAMMING PROBLEM That Make You Look Dumb",
        "What You Can Learn From Bill Gates About COMPETITIVE PROGRAMMING PROBLEM",
        "Best Make COMPETITIVE PROGRAMMING PROBLEM You Will Read This Year (in 2015)",
        "COMPETITIVE PROGRAMMING PROBLEM Made Simple - Even Your Kids Can Do It",
        "Here's A Quick Way To Solve A Problem with COMPETITIVE PROGRAMMING PROBLEM",
        "COMPETITIVE PROGRAMMING PROBLEM Iphone Apps",
        "How To Take The Headache Out Of COMPETITIVE PROGRAMMING PROBLEM",
        "COMPETITIVE PROGRAMMING PROBLEM Expert Interview",
        "4 Ways You Can Grow Your Creativity Using COMPETITIVE PROGRAMMING PROBLEM",
        "How To Find The Right COMPETITIVE PROGRAMMING PROBLEM For Your Specific Product(Service).",
        "The Single Most Important Thing You Need To Know About COMPETITIVE PROGRAMMING PROBLEM",
        "There’s Big Money In COMPETITIVE PROGRAMMING PROBLEM",
        "Where Is The Best COMPETITIVE PROGRAMMING PROBLEM?",
        "COMPETITIVE PROGRAMMING PROBLEM: Do You Really Need It? This Will Help You Decide!",
        "How To Improve At COMPETITIVE PROGRAMMING PROBLEM In 60 Minutes",
        "7 Ways To Keep Your COMPETITIVE PROGRAMMING PROBLEM Growing Without Burning The Midnight Oil",
        "Winning Tactics For COMPETITIVE PROGRAMMING PROBLEM",
        "Why Ignoring COMPETITIVE PROGRAMMING PROBLEM Will Cost You Time and Sales",
        "What Is COMPETITIVE PROGRAMMING PROBLEM and How Does It Work?",
        "How To Win Buyers And Influence Sales with COMPETITIVE PROGRAMMING PROBLEM",
        "Marriage And COMPETITIVE PROGRAMMING PROBLEM Have More In Common Than You Think",
        "In 10 Minutes, I'll Give You The Truth About COMPETITIVE PROGRAMMING PROBLEM",
        "Stop Wasting Time And Start COMPETITIVE PROGRAMMING PROBLEM",
        "Beware The COMPETITIVE PROGRAMMING PROBLEM Scam",
        "Secrets To Getting COMPETITIVE PROGRAMMING PROBLEM To Complete Tasks Quickly And Efficiently",
        "How To Make Your COMPETITIVE PROGRAMMING PROBLEM Look Amazing In 5 Days",
        "The Lazy Way To COMPETITIVE PROGRAMMING PROBLEM",
        "How COMPETITIVE PROGRAMMING PROBLEM Made Me A Better Salesperson",
        "The Philosophy Of COMPETITIVE PROGRAMMING PROBLEM",
        "What Alberto Savoia Can Teach You About COMPETITIVE PROGRAMMING PROBLEM",
        "How To Save Money with COMPETITIVE PROGRAMMING PROBLEM?",
        "10 Funny COMPETITIVE PROGRAMMING PROBLEM Quotes",
        "Learn Exactly How We Made COMPETITIVE PROGRAMMING PROBLEM Last Month",
        "15 Lessons About COMPETITIVE PROGRAMMING PROBLEM You Need To Learn To Succeed",
        "5 Problems Everyone Has With COMPETITIVE PROGRAMMING PROBLEM – How To Solved Them",
        "3 Ways You Can Reinvent COMPETITIVE PROGRAMMING PROBLEM Without Looking Like An Amateur",
        "Everything You Wanted to Know About COMPETITIVE PROGRAMMING PROBLEM and Were Too Embarrassed to Ask",
    ];
    let listStatus = [
        ProblemStatusEnum.SOLVED,
        ProblemStatusEnum.UNSOLVED,
    ];
    let listHardLevel = [
        HardLevelEnum.HARD,
        HardLevelEnum.EASY,
        HardLevelEnum.MEDIUM
    ];

    let listProblemMockup = [];

    for (let i = 0; i < numberOfSlot; i++) {
        let randomNumber = Math.round(Math.random() * 1000000);
        let title = listTitle[randomNumber % listTitle.length];
        let status = listStatus[randomNumber % listStatus.length];
        let hardLevel = listHardLevel[randomNumber % listHardLevel.length];
        listProblemMockup.push(new ProblemSlot(title, hardLevel, status));
    }

    return listProblemMockup;

};

const getListCategoryMockup = function() {

}
