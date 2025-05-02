"use client";

import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  ColumnDef,
} from "@tanstack/react-table";

// Define types for data
interface Person {
  id: number;
  name: string;
  age: number;
  city: string;
  salary: number;
}

// Define types for individual filters
interface Filter {
  id: number;
  columnId: keyof Person | "";
  operator: string;
  value: string;
  columnType: "text" | "numeric" | "";
}

// Define types for filter groups
interface FilterGroup {
  id: number;
  filters: Filter[];
  groups: FilterGroup[];
  connector: "AND" | "OR";
}

// Define comparison options
interface ComparisonOption {
  label: string;
  value: string;
}

interface ComparisonTypes {
  text: ComparisonOption[];
  numeric: ComparisonOption[];
}

// Generate sample data
const generateData = (): Person[] => [
  { id: 1, name: "สมชาย", age: 28, city: "กรุงเทพ", salary: 35000 },
  { id: 2, name: "วิภา", age: 31, city: "เชียงใหม่", salary: 42000 },
  { id: 3, name: "กานดา", age: 24, city: "กรุงเทพ", salary: 30000 },
  { id: 4, name: "ประพันธ์", age: 35, city: "ขอนแก่น", salary: 45000 },
  { id: 5, name: "สมศักดิ์", age: 29, city: "เชียงใหม่", salary: 38000 },
  { id: 6, name: "วิชัย", age: 42, city: "กรุงเทพ", salary: 55000 },
  { id: 7, name: "นภา", age: 27, city: "ภูเก็ต", salary: 40000 },
  { id: 8, name: "อนุชา", age: 33, city: "กรุงเทพ", salary: 48000 },
  { id: 9, name: "มานะ", age: 26, city: "ขอนแก่น", salary: 32000 },
  { id: 10, name: "สุดา", age: 30, city: "ภูเก็ต", salary: 44000 },
];

// Define table columns
const defineColumns = (): ColumnDef<Person>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: "ชื่อ",
    cell: (info) => info.getValue() as string,
  },
  {
    id: "age",
    accessorKey: "age",
    header: "อายุ",
    cell: (info) => info.getValue() as number,
  },
  {
    id: "city",
    accessorKey: "city",
    header: "เมือง",
    cell: (info) => info.getValue() as string,
  },
  {
    id: "salary",
    accessorKey: "salary",
    header: "เงินเดือน",
    cell: (info) => `${(info.getValue() as number).toLocaleString()} บาท`,
  },
];

// Define comparison options
const comparisons: ComparisonTypes = {
  text: [
    { label: "มีคำว่า", value: "contains" },
    { label: "เท่ากับ", value: "equals" },
    { label: "เริ่มต้นด้วย", value: "startsWith" },
    { label: "จบด้วย", value: "endsWith" },
  ],
  numeric: [
    { label: "เท่ากับ", value: "equals" },
    { label: "มากกว่า", value: "greaterThan" },
    { label: "น้อยกว่า", value: "lessThan" },
    { label: "มากกว่าหรือเท่ากับ", value: "greaterThanOrEqual" },
    { label: "น้อยกว่าหรือเท่ากับ", value: "lessThanOrEqual" },
  ],
};

// Compare values for filtering
const compareValues = (
  value: string | number,
  filterValue: string,
  operator: string,
  columnType: "text" | "numeric"
): boolean => {
  if (columnType === "text" && typeof value === "string") {
    const lowerValue = value.toLowerCase();
    const lowerFilterValue = filterValue.toLowerCase();
    switch (operator) {
      case "contains":
        return lowerValue.includes(lowerFilterValue);
      case "equals":
        return lowerValue === lowerFilterValue;
      case "startsWith":
        return lowerValue.startsWith(lowerFilterValue);
      case "endsWith":
        return lowerValue.endsWith(lowerFilterValue);
      default:
        return true;
    }
  } else if (columnType === "numeric" && typeof value === "number") {
    const numValue = parseFloat(filterValue);
    if (isNaN(numValue)) return false;
    switch (operator) {
      case "equals":
        return value === numValue;
      case "greaterThan":
        return value > numValue;
      case "lessThan":
        return value < numValue;
      case "greaterThanOrEqual":
        return value >= numValue;
      case "lessThanOrEqual":
        return value <= numValue;
      default:
        return true;
    }
  }
  return true;
};

// Filter condition component
interface FilterConditionProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
  onRemove: () => void;
  columns: ColumnDef<Person>[];
}

const FilterCondition: React.FC<FilterConditionProps> = ({
  filter,
  onUpdate,
  onRemove,
  columns,
}) => {
  // Display only operator and value if columnId is already set
  return (
    <div className="flex items-center gap-2 mb-2">
      {filter.columnId && (
        <>
          <span className="font-medium min-w-32">
            {columns.find(col => col.id === filter.columnId)?.header as string}:
          </span>
          
          <select
            value={filter.operator}
            onChange={(e) => onUpdate({ ...filter, operator: e.target.value })}
            className="border p-1 rounded"
          >
            <option value="">เลือกเงื่อนไข</option>
            {filter.columnType && comparisons[filter.columnType]?.map((comp) => (
              <option key={comp.value} value={comp.value}>
                {comp.label}
              </option>
            ))}
          </select>

          <input
            type={filter.columnType === "numeric" ? "number" : "text"}
            value={filter.value}
            onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
            placeholder="ค่าที่ต้องการ"
            className="border p-1 rounded"
          />
          
          <button
            onClick={onRemove}
            className="bg-red-500 text-white p-1 rounded"
            type="button"
          >
            ลบ
          </button>
        </>
      )}
    </div>
  );
};

// Column selection component
interface ColumnSelectorProps {
  columns: ColumnDef<Person>[];
  onSelect: (columnId: keyof Person, columnType: "text" | "numeric") => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, onSelect }) => {
  const getColumnType = (columnId: keyof Person): "text" | "numeric" => {
    if (columnId === "age" || columnId === "salary") return "numeric";
    return "text";
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="font-medium">เลือกคอลัมน์:</label>
      <select
        onChange={(e) => {
          const columnId = e.target.value as keyof Person;
          if (columnId) {
            onSelect(columnId, getColumnType(columnId));
          }
        }}
        className="border p-1 rounded"
        defaultValue=""
      >
        <option value="" disabled>เลือกคอลัมน์</option>
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.header as string}
          </option>
        ))}
      </select>
    </div>
  );
};

// Filter group component
interface FilterGroupProps {
  group: FilterGroup;
  onUpdate: (updatedGroup: FilterGroup) => void;
  onRemove: () => void;
  columns: ColumnDef<Person>[];
  depth?: number;
}

const FilterGroupComponent: React.FC<FilterGroupProps> = ({
  group,
  onUpdate,
  onRemove,
  columns,
  depth = 0,
}) => {
  const addGroup = () => {
    onUpdate({
      ...group,
      groups: [
        ...group.groups,
        {
          id: Date.now(),
          filters: [],
          groups: [],
          connector: "AND",
        },
      ],
    });
  };

  const updateFilter = (filterId: number, updatedFilter: Filter) => {
    onUpdate({
      ...group,
      filters: group.filters.map((f) => (f.id === filterId ? updatedFilter : f)),
    });
  };

  const removeFilter = (filterId: number) => {
    onUpdate({
      ...group,
      filters: group.filters.filter((f) => f.id !== filterId),
    });
  };

  const updateGroup = (groupId: number, updatedGroup: FilterGroup) => {
    onUpdate({
      ...group,
      groups: group.groups.map((g) => (g.id === groupId ? updatedGroup : g)),
    });
  };

  const removeGroup = (groupId: number) => {
    onUpdate({
      ...group,
      groups: group.groups.filter((g) => g.id !== groupId),
    });
  };

  return (
    <div className={`border p-4 mb-4 rounded bg-gray-50 ml-${depth * 4}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">กลุ่มเงื่อนไข</span>
          <select
            value={group.connector}
            onChange={(e) =>
              onUpdate({ ...group, connector: e.target.value as "AND" | "OR" })
            }
            className="border p-1 rounded"
          >
            <option value="AND">และ (AND)</option>
            <option value="OR">หรือ (OR)</option>
          </select>
        </div>
        {depth > 0 && (
          <button
            onClick={onRemove}
            className="bg-red-500 text-white p-1 rounded"
            type="button"
          >
            ลบกลุ่ม
          </button>
        )}
      </div>

      <ColumnSelector 
        columns={columns} 
        onSelect={(columnId, columnType) => {
          onUpdate({
            ...group,
            filters: [
              ...group.filters,
              {
                id: Date.now(),
                columnId: columnId,
                operator: columnType === "text" ? "contains" : "equals",
                value: "",
                columnType: columnType,
              },
            ],
          });
        }} 
      />

      {group.filters.map((filter) => (
        <FilterCondition
          key={filter.id}
          filter={filter}
          onUpdate={(updated) => updateFilter(filter.id, updated)}
          onRemove={() => removeFilter(filter.id)}
          columns={columns}
        />
      ))}

      {group.groups.map((subGroup) => (
        <FilterGroupComponent
          key={subGroup.id}
          group={subGroup}
          onUpdate={(updated) => updateGroup(subGroup.id, updated)}
          onRemove={() => removeGroup(subGroup.id)}
          columns={columns}
          depth={depth + 1}
        />
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={addGroup}
          className="bg-green-500 text-white p-2 rounded"
          type="button"
        >
          เพิ่มกลุ่มย่อย
        </button>
      </div>
    </div>
  );
};

export const AdvancedTable: React.FC = () => {
  const data = useMemo(() => generateData(), []);
  const columns = useMemo(() => defineColumns(), []);

  const [filterGroup, setFilterGroup] = useState<FilterGroup>({
    id: Date.now(),
    filters: [],
    groups: [],
    connector: "AND",
  });

  const updateGroup = (groupId: number, updatedGroup: FilterGroup) => {
    if (groupId === filterGroup.id) {
      setFilterGroup(updatedGroup);
    } else {
      setFilterGroup({
        ...filterGroup,
        groups: filterGroup.groups.map((g) =>
          g.id === groupId ? updatedGroup : g
        ),
      });
    }
  };

  const removeGroup = (groupId: number) => {
    setFilterGroup({
      ...filterGroup,
      groups: filterGroup.groups.filter((g) => g.id !== groupId),
    });
  };

  const addFilterGroup = () => {
    setFilterGroup({
      ...filterGroup,
      groups: [
        ...filterGroup.groups,
        {
          id: Date.now(),
          filters: [],
          groups: [],
          connector: "AND",
        },
      ],
    });
  };

  // Recursive filtering logic
  const evaluateGroup = (group: FilterGroup, row: Row<Person>): boolean => {
    const filterResults = group.filters
      .filter((f) => f.columnId && f.operator && f.value)
      .map((filter) =>
        compareValues(
          row.getValue(filter.columnId),
          filter.value,
          filter.operator,
          filter.columnType === "text" || filter.columnType === "numeric" ? filter.columnType : "text"
        )
      );

    const groupResults = group.groups.map((subGroup) =>
      evaluateGroup(subGroup, row)
    );

    const allResults = [...filterResults, ...groupResults];

    if (allResults.length === 0) return true;

    return group.connector === "AND"
      ? allResults.every((result) => result)
      : allResults.some((result) => result);
  };

  const filterData = (row: Row<Person>): boolean => {
    return evaluateGroup(filterGroup, row);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: {},
    },
    manualFiltering: true,
    filterFns: {
      custom: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
      },
    },
  });

  const filteredRows = useMemo(() => {
    return table.getCoreRowModel().rows.filter(filterData);
  }, [filterGroup, data]);

  // Check if there are any active filters
  const hasActiveFilters = filterGroup.filters.some(f => f.columnId && f.operator) || 
                         filterGroup.groups.length > 0;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        ตารางข้อมูลพนักงานพร้อมตัวกรองขั้นสูง
      </h1>
      
      {/* ตัวกรองขั้นสูง */}
      <div className="border p-4 mb-4 rounded bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">ตัวกรองขั้นสูง</h2>
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span>เชื่อมเงื่อนไข:</span>
              <select
                value={filterGroup.connector}
                onChange={(e) =>
                  setFilterGroup({
                    ...filterGroup,
                    connector: e.target.value as "AND" | "OR",
                  })
                }
                className="border p-1 rounded"
              >
                <option value="AND">และ (AND)</option>
                <option value="OR">หรือ (OR)</option>
              </select>
            </div>
          )}
        </div>

        {/* Column selector at the top level */}
        <ColumnSelector 
          columns={columns} 
          onSelect={(columnId, columnType) => {
            setFilterGroup({
              ...filterGroup,
              filters: [
                ...filterGroup.filters,
                {
                  id: Date.now(),
                  columnId: columnId,
                  operator: columnType === "text" ? "contains" : "equals",
                  value: "",
                  columnType: columnType,
                },
              ],
            });
          }} 
        />

        {/* Display existing filters */}
        {filterGroup.filters.map((filter) => (
          <FilterCondition
            key={filter.id}
            filter={filter}
            onUpdate={(updated) => {
              setFilterGroup({
                ...filterGroup,
                filters: filterGroup.filters.map((f) =>
                  f.id === filter.id ? updated : f
                ),
              });
            }}
            onRemove={() => {
              setFilterGroup({
                ...filterGroup,
                filters: filterGroup.filters.filter((f) => f.id !== filter.id),
              });
            }}
            columns={columns}
          />
        ))}

        {/* Display filter groups */}
        {filterGroup.groups.map((subGroup) => (
          <FilterGroupComponent
            key={subGroup.id}
            group={subGroup}
            onUpdate={(updated) => updateGroup(subGroup.id, updated)}
            onRemove={() => removeGroup(subGroup.id)}
            columns={columns}
            depth={1}
          />
        ))}

        {/* Add group button */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={addFilterGroup}
            className="bg-green-500 text-white p-2 rounded"
            type="button"
          >
            เพิ่มกลุ่มเงื่อนไข
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRows.length === 0 && (
          <div className="text-center p-4 bg-white border border-t-0">
            ไม่พบข้อมูลที่ตรงกับเงื่อนไข
          </div>
        )}
      </div>
    </div>
  );
};