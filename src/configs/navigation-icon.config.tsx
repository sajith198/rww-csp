import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineViewList,
    HiCurrencyRupee,
    HiOutlineUserGroup,
    HiDocumentText,
} from 'react-icons/hi'
import { FaUserTie, FaChild, FaUserNurse } from 'react-icons/fa'

import { TbListDetails } from 'react-icons/tb'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    sponsorships: <HiDocumentText />,
    sponsors: <FaUserTie />,
    children: <HiOutlineUserGroup />,
    caretaker: <FaUserNurse />,
    payments: <HiCurrencyRupee />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
