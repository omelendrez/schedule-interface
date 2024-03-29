const formatNumber = value => {
  return new Intl.NumberFormat('es-AR', {
    maximumSignificantDigits: 3
  }).format(value)
}

export default {
  grid: [
    {
      key: 'fullName',
      label: 'Empleado',
      class: 'p-0 py-1 full-name',
      thStyle: {
        width: '160px'
      }
    },
    {
      key: 'h06',
      label: '06',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h07',
      label: '07',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h08',
      label: '08',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h09',
      label: '09',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h10',
      label: '10',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h11',
      label: '11',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h12',
      label: '12',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h13',
      label: '13',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h14',
      label: '14',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h15',
      label: '15',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h16',
      label: '16',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h17',
      label: '17',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h18',
      label: '18',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h19',
      label: '19',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h20',
      label: '20',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h21',
      label: '21',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h22',
      label: '22',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h23',
      label: '23',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h24',
      label: '24',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'h25',
      label: '01',
      class: 'text-center p-0 py-1'
    },
    {
      key: 'hours',
      label: 'Horas',
      class: 'text-center p-0 py-1'
    }
  ],
  positions: [
    {
      key: 'color',
      label: '&nbsp;',
      class: 'p-1'
    },
    {
      key: 'sector_position',
      label: 'Sector / Función',
      class: 'p-1'
    },
    {
      key: 'hours',
      label: 'Horas',
      class: 'text-right p-1 pr-2'
    }
  ],
  reportResultsSector: [
    {
      key: 'sector',
      label: 'Sector'
    },
    {
      key: 'total',
      label: 'Total',
      class: 'text-right p-1 pr-2',
      formatter: value => formatNumber(value)
    }
  ],
  reportResultsAll: [
    {
      key: 'sector',
      label: 'Sector'
    },
    {
      key: 'position',
      label: 'Función'
    },
    {
      key: 'total',
      label: 'Total',
      class: 'text-right p-1 pr-2',
      formatter: value => formatNumber(value)
    }
  ]
}
