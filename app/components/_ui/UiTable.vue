<script setup lang="ts" generic="TData extends object">
/* TODO: row expanding transitions */
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useVueTable,
  type Cell,
  type ColumnDef,
  type Header,
  type Row,
} from '@tanstack/vue-table'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

const {
  columns = [],
  data = [],
  trClass,
} = defineProps<{
  columns?: Array<ColumnDef<TData>>
  data?: TData[]
  loading?: boolean
  tableClass?: ClassNameValue
  tbodyClass?: ClassNameValue
  tdClass?: ClassNameValue
  thClass?: ClassNameValue
  theadClass?: ClassNameValue
  trClass?: ClassNameValue | ((row: Row<TData>) => ClassNameValue)
}>()

const table = useVueTable({
  columns,
  data: toRef(() => data),
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getRowCanExpand: () => true,
})

const headerRows = computed(() => table.getHeaderGroups())
const bodyRows = computed(() => table.getRowModel().rows)

function getRowClass(row: Row<TData>) {
  return typeof trClass === 'function' ? trClass(row) : trClass
}

function getHeaderClass(header: Header<TData, unknown>) {
  return typeof header.column.columnDef.meta?.class?.th === 'function'
    ? header.column.columnDef.meta.class.th(header)
    : header.column.columnDef.meta?.class?.th
}

function getCellClass(cell: Cell<TData, unknown>) {
  return typeof cell.column.columnDef.meta?.class?.td === 'function'
    ? cell.column.columnDef.meta.class.td(cell)
    : cell.column.columnDef.meta?.class?.td
}
</script>

<template>
  <div class="relative">
    <table
      :data-loading="loading || undefined"
      :class="twMerge(
        `
          w-full transition-opacity
          data-loading:opacity-50
        `,
        tableClass,
      )"
    >
      <thead
        :class="twMerge(
          `
            text-sm text-neutral-500
            dark:text-neutral-400
          `,
          theadClass,
        )"
      >
        <tr
          v-for="row in headerRows"
          :key="row.id"
        >
          <th
            v-for="header in row.headers"
            :key="header.id"
            :colspan="header.colSpan"
            :rowspan="header.rowSpan"
            :class="twMerge(
              `
                bg-neutral-100 p-4 text-start font-semibold
                first:rounded-l-lg
                last:rounded-r-lg
                dark:bg-neutral-800
              `,
              getHeaderClass(header),
              thClass,
            )"
          >
            <slot
              :name="`head(${header.id})`"
              :header
              :text="header.column.columnDef.header"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </slot>
          </th>
        </tr>
      </thead>

      <tbody :class="tbodyClass">
        <template
          v-for="row in bodyRows"
          :key="row.id"
        >
          <tr
            :data-expanded="row.getIsExpanded() || undefined"
            :class="twMerge(
              'group/row',
              getRowClass(row),
            )"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="twMerge(
                `
                  px-4 py-3.5
                  group-even/row:bg-neutral-50
                  group-data-expanded/row:bg-violet-100
                  group-data-expanded/row:first:rounded-bl-none
                  group-data-expanded/row:last:rounded-br-none
                  lg:first:rounded-l-lg lg:last:rounded-r-lg
                  dark:group-even/row:bg-neutral-900
                  dark:group-data-expanded/row:bg-violet-950
                `,
                getCellClass(cell),
                tdClass,
              )"
            >
              <slot
                :name="`cell(${cell.column.id})`"
                :cell
                :is-row-expanded="row.getIsExpanded()"
                :item="cell.row.original"
                :text="cell.getValue()"
                :toggle-row-expanded="row.getToggleExpandedHandler()"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </slot>
            </td>
          </tr>

          <Transition
            enter-from-class="h-0"
            leave-to-class="h-0"
          >
            <tr
              v-if="row.getIsExpanded()"
              :data-expansion="row.getIsExpanded() || undefined"
            >
              <td :colspan="row.getAllCells().length">
                <div
                  class="
                    border border-violet-100
                    lg:rounded-b-lg
                    dark:border-violet-950
                  "
                >
                  <slot
                    name="row-expanded"
                    :toggle-row-expanded="row.getToggleExpandedHandler()"
                    :row
                  />
                </div>
              </td>
            </tr>
          </Transition>
        </template>

        <tr v-if="!bodyRows.length">
          <td
            :colspan="table.getAllColumns().length"
            class="
              p-4 text-center text-neutral-500
              dark:text-neutral-400
            "
          >
            <slot name="empty">
              {{ $ts('table.empty') }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <span
      v-if="loading"
      class="absolute top-4 right-4 flex size-6 animate-spin opacity-50"
    >
      <Icon
        name="mingcute:loading-3-fill"
        class="text-2xl"
      />
    </span>
  </div>
</template>
