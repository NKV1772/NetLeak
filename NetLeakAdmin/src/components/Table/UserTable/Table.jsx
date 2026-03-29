import React, {useContext} from "react";
import { UserContext } from "../../../context/user/userContext";

const Table = () => {
    const {users, searchUserText} = useContext(UserContext)

    return (
        <section className="w-full antialiased  text-gray-600 rounded-xl overflow-hidden">
            <div className="flex flex-col justify-center h-full">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Khách hàng</h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Tên</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Email</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Giới tính</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Số điện thoại</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {users.map((ele, index)=> {
                                        if(ele.name.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.email.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.sexuality.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.phone.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            searchUserText=='')
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg" width="40" height="40" alt="Burak Long" /></div>
                                                            <div className="font-medium text-gray-800">{ele.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">{ele.email}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">{ele.sexuality=='male'?'Nam':'Nữ'}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">{ele.phone}</div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Table;