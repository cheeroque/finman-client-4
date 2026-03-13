<script setup lang="ts" generic="TData extends object">
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
import type { ClassValue } from 'vue'

const {
  columns = [],
  data = [],
  trClass,
} = defineProps<{
  columns?: Array<ColumnDef<TData>>
  data?: TData[]
  loading?: boolean
  tableClass?: ClassValue
  tbodyClass?: ClassValue
  tdClass?: ClassValue
  thClass?: ClassValue
  theadClass?: ClassValue
  trClass?: ClassValue | ((row: Row<TData>) => ClassValue)
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
      :class="mergeClasses(
        `
          w-full transition-opacity
          data-loading:opacity-50
        `,
        tableClass,
      )"
    >
      <thead
        :class="mergeClasses(
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
            :class="mergeClasses(
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
            :class="mergeClasses(
              'group/row',
              getRowClass(row),
            )"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="mergeClasses(
                `
                  px-4 py-3.5 transition-all duration-300
                  group-even/row:bg-neutral-50
                  group-data-expanded/row:bg-violet-100
                  group-data-expanded/row:first:rounded-bl-none
                  group-data-expanded/row:last:rounded-br-none
                  lg:first:rounded-l-lg
                  lg:last:rounded-r-lg
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
                :toggle-row-expanded="row.getToggleExpandedHandler()"
                :value="cell.getValue()"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </slot>
            </td>
          </tr>

          <UiTableExpansion
            :colspan="row.getAllCells().length"
            :is-expanded="row.getIsExpanded()"
          >
            <slot
              name="row-expanded"
              :toggle-row-expanded="row.getToggleExpandedHandler()"
              :row
            />
          </UiTableExpansion>
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

    <ClientOnly>
      <span
        v-if="loading"
        class="absolute top-4 right-4 flex size-6 animate-spin opacity-50"
      >
        <Icon
          name="mynaui:spinner"
          class="text-2xl"
        />
      </span>
    </ClientOnly>
  </div>
</template>
