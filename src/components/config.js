System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  //map tells the System loader where to look for things
  map: {
    contactForm: "./components/ng2-contact-form"
  },
  //packages defines our app package
  packages: {
    contactForm: {
      main: './contact-form.ts',
      defaultExtension: 'ts'
    }
  }
});
