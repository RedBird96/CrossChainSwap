import { Button, Container, Link, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ExtractedTransfer, Transfer } from "../utils/types";
import { ellipse, isNumber, timeDiff, toNumber } from "../utils/math";
import moment from "moment";
import clsx from 'clsx'
import _ from 'lodash'
import { TX_LIMIT_SIZE } from "../utils/constants";

const TIME_FORMAT = 'MMM D, YYYY h:mm:ss A'

// Sub-component: Loading Spinner
const Spinner = () => (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
);

function Tooltip({ 
    content, 
    className, 
    children, 
    parentClassName 
}: { content: any, className: any, children: any, parentClassName: any }) {
    return (
      <div className={clsx('group relative flex justify-center', parentClassName)}>
        <div className="hidden group-hover:block absolute z-50 bg-black -top-10 px-2 py-1 rounded-lg">
          <div className={clsx('text-white text-sm font-normal', className)}>
            {content}
          </div>
        </div>
        {children}
      </div>
    )
}

function TimePanel({ 
    timestamp, format = TIME_FORMAT, noTooltip = false, title, className 
}: { timestamp: any, format?: string, noTooltip?: boolean, title?: any, className?: any }) {
    const [trigger, setTrigger] = useState(false)
  
    useEffect(() => {
      const timeout = setTimeout(() => setTrigger(!trigger), 1 * 1000)
      return () => clearTimeout(timeout)
    }, [trigger, setTrigger])
  
    if (!(timestamp || isNumber(timestamp))) return
    const time = moment(timestamp)
    const diff = timeDiff(time)
    const timeDisplay = diff > 59 || diff <= 0 ? time.fromNow() : `${diff}s ago`
  
    const element = (
      <span className={clsx('text-zinc-400 dark:text-zinc-500 font-normal whitespace-nowrap', className)}>
        {timeDisplay}
      </span>
    )
    format = diff < 30 * 24 * 60 * 60 && format === TIME_FORMAT ? 'MMM D, H:mm:ss' : format
  
    return noTooltip ? element : (
      <Tooltip content={`${title ? `${title} ` : ''}${time.format(format)}`} className="whitespace-nowrap" parentClassName="">
        {element}
      </Tooltip>
    )
}

const TransactionList = ({data, total, fee}:{data: ExtractedTransfer[], total:any, fee: any}) => {
    
    const sizePerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const page = toNumber(TX_LIMIT_SIZE) / sizePerPage
    let pageData: ExtractedTransfer[] = data.slice((currentPage - 1) * sizePerPage, 
        currentPage * sizePerPage > TX_LIMIT_SIZE ? TX_LIMIT_SIZE : currentPage * sizePerPage);
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (currentPage != page) {
            pageData = data.slice((currentPage - 1) * sizePerPage, 
            currentPage * sizePerPage > TX_LIMIT_SIZE ? TX_LIMIT_SIZE : currentPage * sizePerPage);
        }
    }, [currentPage])

    return (
        <Container className="sm:mt-8">
        <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-8 justify-between">
                <div>
                    <h1 className="text-zinc-900 dark:text-zinc-100 text-base font-semibold leading-6">Token Transfers</h1>
                    <p className="mt-2 text-zinc-400 dark:text-zinc-500 text-sm">{TX_LIMIT_SIZE} / {total}</p>
                </div>
                <div>
                    <h1 className="text-zinc-900 dark:text-zinc-100 text-base font-semibold leading-6">Bridge Fee</h1>
                    <p className="mt-2 text-zinc-400 dark:text-zinc-500 text-sm">${fee}</p>
                </div>
            </div>
        </div>
        {!pageData || pageData.length == 0 ? <Spinner /> :
        <div>
            <div className="overflow-x-auto lg:overflow-x-visible -mx-4 sm:-mx-0 mt-4">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                <thead className="sticky top-0 z-10 bg-white dark:bg-zinc-900">
                <tr className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold">
                    <th scope="col" className="whitespace-nowrap pl-4 sm:pl-0 pr-3 py-3.5 text-left">
                        Tx Hash
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Method
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Source
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Destination
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Status
                    </th>
                    <th scope="col" className="whitespace-nowrap pl-3 pr-4 sm:pr-0 py-3.5 text-right">
                        Created at
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800">
                {pageData.map(d => {
                    return (<tr key={d.txhash} className="align-top text-zinc-400 dark:text-zinc-500 text-sm">
                            <td className="pl-4 sm:pl-0 pr-3 py-4 text-left">
                                <div className="flex items-center gap-x-1"> 
                                    <Link
                                        href={`/transfer/${d.txhash}`}
                                        target="_blank"
                                        className="text-blue-600 dark:text-blue-500 font-semibold"
                                    >
                                        {ellipse(d.txhash, 4, '0x')}
                                    </Link>
                                </div>
                            </td>
                            <td className="px-3 py-4 text-left">
                               <div>
                                {d.type}
                               </div>
                            </td>
                            <td className="px-3 py-4 text-left">
                                <div className="flex flex-col gap-y-1">
                                    <div>{d.source_chain}</div>
                                    <div>{ellipse(d.sender_address, 4, '0x')}</div>
                                </div>
                            </td>
                            <td className="px-3 py-4 text-left">
                                <div className="flex flex-col gap-y-1">
                                    <div>{d.destination_chain}</div>
                                    <div>{ellipse(d.recipient_address, 4, '0x')}</div>
                                </div>
                            </td>
                            <td className="px-3 py-4 text-left">
                                <div>
                                    {d.status}
                                </div>
                            </td>
                            <td className="px-3 py-4 text-left">
                                <TimePanel timestamp={d.created_at.ms} />
                            </td>
                    </tr>)
                })
                }
                </tbody>
            </table>
            </div>
            {TX_LIMIT_SIZE > sizePerPage && (
                <div className="flex items-center justify-center mt-8">
                    <Pagination 
                        count={page} 
                        page={currentPage}
                        onChange={handlePageChange}
                        showFirstButton
                        showLastButton
                    />
                </div>
            )}
        </div>
        }
    </Container>
    )
};

export default TransactionList;