

var os = require("os");

      //��ȡcpu(�������ܹ�)
      var arch = os.arch();
      console.log("��ȡcpu(�������ܹ�)" + arch);

      //��ȡcpu��Ϣ
      var cpus = os.cpus();
      console.log("cpu��Ϣ:" + cpus.model);

      //�ֽ�˳�� ��λ���ȷ���BE,��λ���ȵķ���LE
      var endianness = os.endianness();
      console.log("�ֽ�˳�� ��λ���ȷ���BE,��λ���ȵķ���LE" + endianness);

      //�����ڴ��ֽ�
      var freemem = os.freemem();
      console.log("�����ڴ��ֽ�" + freemem);

      //��ǰ��¼�û��ĸ�Ŀ¼
      var homedir = os.homedir();
      console.log("��¼�û��ĸ�Ŀ¼" + homedir);

      //����ϵͳ������
      var hostname = os.hostname();
      console.log("��������" + hostname);

      //ϵͳ���5��10��15���ӵ�ƽ������,����һ�����linux��unix��ͳ�ƣ�windows��ʼ�շ���[0,0,0]
      var loadavg = os.loadavg();
      console.log(loadavg);

      //���������б�
      var networkInterfaces = os.networkInterfaces();
      console.log("���������б�" + networkInterfaces.toString());
      for (item1 in networkInterfaces) {
        console.log(item1);
      }
      //����ϵͳ����,����ֵ��'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
      var platform = os.platform();
      console.log("����ϵͳ����" + platform);

      //����ϵͳ�汾
      var release = os.release();
      console.log("����ϵͳ�汾" + release);

      //����ϵͳ��ʱ�ļ���Ĭ��Ŀ¼
      var tmpdir = os.tmpdir();
      console.log(tmpdir);

      //ϵͳ���ڴ�
      var totalmem = os.totalmem();
      console.log(totalmem);

      //����ϵͳ���ƣ�����linux�ķ���linux,����ƻ���ķ���Darwin,����windows�ķ���Windows_NT
      var type = os.type();
      console.log(type);

      //�������������ʱ��
      var uptime = os.uptime();
      console.log(uptime);