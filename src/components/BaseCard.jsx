import { BoxTopLeftBottomRight, BoxAllSide, BoxAllSideExceptTopLeft } from "./BaseBox"
import iconLeftCard from "../assets/ic_card_left.svg"
import iconBottomCard from "../assets/ic_card_bottom.svg"

function BaseCard({ 
    children, 
    borderColor = "#174828", 
    bg = "linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 99.1%)",
    padding = 20
}) {
    return (
        <BoxTopLeftBottomRight
            cut={20}
            borderW={1.5}
            borderColor={borderColor}
            bg={bg}
            contentPadding={padding}
        >
            {children}
        </BoxTopLeftBottomRight>
    )
}

BaseCard.Form = function BaseCardForm({ children }) {
    return (
        <div className="flex min-w-full justify-center h-auto">
            <BoxAllSideExceptTopLeft
                cut={16}
                borderW={1.5}
                borderColor="#174828"
                bg="linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 99.1%)"
                contentPadding={20}
            >
                <div className="absolute left-0 bottom-0">
                    <img src={iconLeftCard} alt="" />
                </div>
                <div className="absolute left-10 bottom-0">
                    <img src={iconBottomCard} alt="" />
                </div>

                <div className="px-2 py-1 w-full">
                    {children}
                </div>
            </BoxAllSideExceptTopLeft>
        </div>
    )
}

BaseCard.All = function BaseCardAll({
    children,
    borderW = 1.5,
    border = "#174828",
    bg = "linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 99.1%)",
    innerShadow = '',
    padding = 20,
    cut = 16,
}) {
    return (
        <BoxAllSide
            cut={cut}
            borderW={borderW}
            borderColor={border}
            bg={bg}
            contentPadding={padding}
            innerShadow={innerShadow}
        >
            <div className="py-1 w-full">
                {children}
            </div>
        </BoxAllSide>
    )
}
export default BaseCard
